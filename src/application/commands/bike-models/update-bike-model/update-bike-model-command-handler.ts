import BikeModelDTO from '../../../interfaces/dtos/bike-model-dto';
import BikeModelRepositoryWriter from '../../../ports/repositories/bike-model-repository-writer';
import UpdateBikeModelCommand from './update-bike-model-command';
import UpdateBikeModelCommandValidator from './update-bike-model-command-validator';

export default class UpdateBikeModelCommandHandler {
  constructor(private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter) {}

  /**
   * @throws {
   *  InvalidCommandError,
   *  BikeModelNotFoundError,
   * }
   */
  async execute(updateBikeModelCommand: UpdateBikeModelCommand): Promise<BikeModelDTO> {
    new UpdateBikeModelCommandValidator().validateCommand(updateBikeModelCommand);

    const bikeModelNameInput = updateBikeModelCommand.bikeModelData.name.trim();
    const bikeModelDTO = new BikeModelDTO(null, bikeModelNameInput);

    return await this.bikeModelRepositoryWriter.update(updateBikeModelCommand.bikeModelId, bikeModelDTO);
  }
}
