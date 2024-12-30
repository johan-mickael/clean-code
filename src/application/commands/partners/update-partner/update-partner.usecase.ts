import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import UpdatePartnerCommand from './update-partner.command';

export default abstract class UpdatePartnerUseCase {
  /**
   * @throws InvalidCommandError
   * @throws PartnerNotFoundError
   * @throws DealerNotFoundError
   */
  abstract execute(updatePartnerCommand: UpdatePartnerCommand): Promise<PartnerDTO>;
}
