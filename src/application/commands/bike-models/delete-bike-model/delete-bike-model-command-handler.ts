import BikeModelRepositoryWriter from '../../../ports/repositories/writers/bike-model-repository-writer';
import DeleteBikeModelCommand from './delete-bike-model-command';
import DeleteBikeModelCommandValidator from './delete-bike-model-command-validator';

export default class DeleteBikeModelCommandHandler {
  constructor(private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter) {}

  /**
   * @throws {
   *  InvalidCommandError,
   *  BikeModelNotFoundError,
   * }
   */
  async execute(deleteBikeModelCommand: DeleteBikeModelCommand): Promise<void> {
    new DeleteBikeModelCommandValidator().validateCommand(deleteBikeModelCommand);

    const bikeModelIdInput = deleteBikeModelCommand.bikeModelId.trim();

    await this.bikeModelRepositoryWriter.delete(bikeModelIdInput);
  }
}
