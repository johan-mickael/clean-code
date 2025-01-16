import DeleteDrivingHistoryCommand from './delete-driving-history.command';

export default abstract class DeleteDrivingHistoryUseCase {
  /**
   * @throws InvalidCommandError
   * @throws DrivingHistoryNotFoundError
   */
  abstract execute(deleteDrivingHistoryCommand: DeleteDrivingHistoryCommand): Promise<void>;
}
