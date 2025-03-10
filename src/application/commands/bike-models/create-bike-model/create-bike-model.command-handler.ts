import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import BikeModelDTOMapper from '../../../interfaces/mappers/bike-model.dto-mapper';
import BikeModelRepositoryWriter from '../../../ports/repositories/writers/bike-model.repository-writer';
import CreateBikeModelCommand from './create-bike-model.command';
import CreateBikeModelCommandValidator from './create-bike-model.command-validator';
import CreateBikeModelUseCase from './create-bike-model.usecase';

export default class CreateBikeModelCommandHandler implements CreateBikeModelUseCase {
  constructor(private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter) {}

  async execute(createBikeModelCommand: CreateBikeModelCommand): Promise<BikeModelDTO> {
    new CreateBikeModelCommandValidator().validateCommand(createBikeModelCommand);

    const bikeModelNameInput = createBikeModelCommand.bikePayload.name.trim();
    const bikeModelDTO = new BikeModelDTO(null, bikeModelNameInput);

    const createdBikeModelEntity = await this.bikeModelRepositoryWriter.create(bikeModelDTO);
    return BikeModelDTOMapper.toDTO(createdBikeModelEntity);
  }
}
