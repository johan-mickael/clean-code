import SpareOrderRepositoryWriter from '../../../ports/repositories/writers/spare-order-repository-writer';
import DeleteSpareOrderCommand from './delete-spare-order.command';

export default class DeleteSpareOrderCommandHandler {
  constructor(private readonly spareOrderRepositoryWriter: SpareOrderRepositoryWriter) {}

  async execute(deleteSpareOrderCommand: DeleteSpareOrderCommand): Promise<void> {
    const spareOrderIdInput = deleteSpareOrderCommand.spareOrderId;

    await this.spareOrderRepositoryWriter.delete(spareOrderIdInput);
  }
}
