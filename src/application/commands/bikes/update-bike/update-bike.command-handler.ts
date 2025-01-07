import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found.error';

import BikeDTO from '../../../interfaces/dtos/bike.dto';
import BikeModelRepositoryReader from '../../../ports/repositories/readers/bike-model.repository-reader';
import PartnerRepositoryReader from '../../../ports/repositories/readers/partner.repository-reader';
import BikeRepositoryWriter from '../../../ports/repositories/writers/bike-repository-writer';
import UpdateBikeCommand from './update-bike.command';
import UpdateBikeCommandValidator from './update-bike.command-validator';
import UpdateBikeUseCase from './update-bike.usecase';

export default class UpdateBikeCommandHandler implements UpdateBikeUseCase {
  constructor(
    private readonly bikeRepositoryWriter: BikeRepositoryWriter,
    private readonly bikeModelRepositoryReader: BikeModelRepositoryReader,
    private readonly partnerRepositoryReader: PartnerRepositoryReader,
  ) {}

  async execute(updateBikeCommand: UpdateBikeCommand): Promise<BikeDTO> {
    new UpdateBikeCommandValidator().validateCommand(updateBikeCommand);

    const bikeModelIdInput = updateBikeCommand.bikePayload.bikeModelId;
    const associatedBikeModel = await this.bikeModelRepositoryReader.getById(bikeModelIdInput);
    if (!associatedBikeModel) {
      throw new BikeModelNotFoundError();
    }

    const partnerIdInput = updateBikeCommand.bikePayload.partnerId;
    const associatedPartner = await this.partnerRepositoryReader.getById(partnerIdInput);
    if (!associatedPartner) {
      throw new PartnerNotFoundError();
    }

    const bikeMileageInput = updateBikeCommand.bikePayload.mileage || 0;
    const bikeStatusInput = updateBikeCommand.bikePayload.status || 0;
    const bikeCirculationDateInput = updateBikeCommand.bikePayload.circulationDate || new Date();

    const bikeDTO = new BikeDTO(
      null,
      associatedBikeModel.id,
      associatedPartner.id,
      bikeMileageInput,
      bikeStatusInput,
      bikeCirculationDateInput,
    );

    return await this.bikeRepositoryWriter.update(updateBikeCommand.bikeId, bikeDTO);
  }
}
