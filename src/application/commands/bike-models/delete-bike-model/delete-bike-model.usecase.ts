import DeleteBikeModelCommand from './delete-bike-model.command';

export default abstract class DeleteBikeModelUseCase {
  /**
   * @throws InvalidCommandError
   * @throws BikeModelNotFoundError
   */
  abstract execute(deleteBikeModelCommand: DeleteBikeModelCommand): Promise<void>;
}
