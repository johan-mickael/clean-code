import DeleteSparePartCommand from './delete-spare-part.command';

export default abstract class DeleteSparePartUseCase {
  /**
   * @throws InvalidCommandError
   * @throws SparePartNotFoundError
   */
  abstract execute(deleteSparePartCommand: DeleteSparePartCommand): Promise<void>;
}
