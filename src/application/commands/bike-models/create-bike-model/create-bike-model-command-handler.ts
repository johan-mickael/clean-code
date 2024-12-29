import BikeModelDTO from '../../../interfaces/dtos/bike-model-dto';
import BikeModelRepositoryWriter from '../../../ports/repositories/writers/bike-model-repository-writer';
import CreateBikeModelCommand from './create-bike-model-command';
import CreateBikeModelCommandValidator from './create-bike-model-command-validator';

export default class CreateBikeModelCommandHandler {
  constructor(private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter) {}

  /**
   * @throws {
   *  InvalidCommandError,
   * }
   */
  async execute(createBikeModelCommand: CreateBikeModelCommand): Promise<BikeModelDTO> {
    new CreateBikeModelCommandValidator().validateCommand(createBikeModelCommand);

    const bikeModelNameInput = createBikeModelCommand.bikePayload.name.trim();
    const bikeModelDTO = new BikeModelDTO(null, bikeModelNameInput);

    return await this.bikeModelRepositoryWriter.create(bikeModelDTO);
  }
}
