import DeleteSpareOrderCommand from './delete-spare-order.command';

export default abstract class DeleteSpareOrderUseCase {
  /**
   * @throws InvalidCommandError
   * @throws SpareOrderNotFoundError
   */
  abstract execute(deleteSpareOrderCommand: DeleteSpareOrderCommand): Promise<void>;
}
