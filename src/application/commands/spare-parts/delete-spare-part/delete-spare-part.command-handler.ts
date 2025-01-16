import SparePartRepositoryWriter from '../../../ports/repositories/writers/spare-part-repository-writer';
import DeleteSparePartCommand from './delete-spare-part.command';

export default class DeleteSparePartCommandHandler {
  constructor(private readonly sparePartRepositoryWriter: SparePartRepositoryWriter) {}

  async execute(deleteSparePartCommand: DeleteSparePartCommand): Promise<void> {
    const sparePartIdInput = deleteSparePartCommand.sparePartId;

    await this.sparePartRepositoryWriter.delete(sparePartIdInput);
  }
}
