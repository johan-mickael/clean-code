import PartnerRepositoryWriter from '../../../ports/repositories/writers/bike-model.repository-writer';
import DeletePartnerCommand from './delete-partner.command';
import DeletePartnerCommandValidator from './delete-partner.command-validator';
import DeletePartnerUseCase from './delete-partner.usecase';

export default class DeletePartnerCommandHandler implements DeletePartnerUseCase {
  constructor(private readonly partnerRepositoryWriter: PartnerRepositoryWriter) {}

  async execute(deletePartnerCommand: DeletePartnerCommand): Promise<void> {
    new DeletePartnerCommandValidator().validateCommand(deletePartnerCommand);

    const partnerIdInput = deletePartnerCommand.partnerId.trim();

    await this.partnerRepositoryWriter.delete(partnerIdInput);
  }
}
