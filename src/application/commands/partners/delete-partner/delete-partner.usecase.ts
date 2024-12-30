import PartnerRepositoryWriter from '../../../ports/repositories/writers/bike-model.repository-writer';
import DeletePartnerCommand from './delete-partner.command';
import DeletePartnerCommandValidator from './delete-partner.command-validator';

export default abstract class DeletePartnerUseCase {
  /**
   * @throws InvalidCommandError
   * @throws PartnerNotFoundError
   */
  abstract execute(deletePartnerCommand: DeletePartnerCommand): Promise<void>;
}
