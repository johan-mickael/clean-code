import DeleteBikeCommand from './delete-bike.command';

export default abstract class DeleteBikeUseCase {
  /**
   * @throws InvalidCommandError
   * @throws BikeNotFoundError
   */
  abstract execute(deleteBikeCommand: DeleteBikeCommand): Promise<void>;
}
