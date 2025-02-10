import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found.error';

import BikeDTO from '../../../interfaces/dtos/bike.dto';
import BikeDTOMapper from '../../../interfaces/mappers/bike.dto-mapper';
import BikeModelRepositoryReader from '../../../ports/repositories/readers/bike-model.repository-reader';
import PartnerRepositoryReader from '../../../ports/repositories/readers/partner.repository-reader';
import BikeRepositoryWriter from '../../../ports/repositories/writers/bike-repository-writer';
import CreateBikeCommand from './create-bike.command';
import CreateBikeCommandValidator from './create-bike.command-validator';
import CreateBikeUseCase from './create-bike.usecase';

export default class CreateBikeCommandHandler implements CreateBikeUseCase {
  constructor(
    private readonly bikeRepositoryWriter: BikeRepositoryWriter,
    private readonly bikeModelRepositoryReader: BikeModelRepositoryReader,
    private readonly partnerRepositoryReader: PartnerRepositoryReader,
  ) {}

  async execute(createBikeCommand: CreateBikeCommand): Promise<BikeDTO> {
    new CreateBikeCommandValidator().validateCommand(createBikeCommand);

    const bikeModelIdInput = createBikeCommand.bikePayload.bike_model_id;
    const associatedBikeModel = await this.bikeModelRepositoryReader.getById(bikeModelIdInput);
    if (!associatedBikeModel) {
      throw new BikeModelNotFoundError();
    }

    const partnerIdInput = createBikeCommand.bikePayload.partner_id;
    const associatedPartner = await this.partnerRepositoryReader.getById(partnerIdInput);
    if (!associatedPartner) {
      throw new PartnerNotFoundError();
    }

    const bikeMileageInput = createBikeCommand.bikePayload.mileage || 0;
    const bikeStatusInput = createBikeCommand.bikePayload.status || 0;
    const bikeCirculationDateInput = createBikeCommand.bikePayload.circulationDate || new Date();

    const bikeDTO = new BikeDTO(
      null,
      associatedBikeModel.id,
      associatedPartner.id,
      bikeMileageInput,
      bikeStatusInput,
      bikeCirculationDateInput,
    );

    const createdBikeEntity = await this.bikeRepositoryWriter.create(bikeDTO);
    return BikeDTOMapper.toDTO(createdBikeEntity);
  }
}
