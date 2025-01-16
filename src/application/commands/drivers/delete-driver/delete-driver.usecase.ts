import DeleteDriverCommand from './delete-driver.command';

export default abstract class DeleteDriverUseCase {
  /**
   * @throws InvalidCommandError
   * @throws DriverNotFoundError
   */
  abstract execute(deleteDriverCommand: DeleteDriverCommand): Promise<void>;
}
