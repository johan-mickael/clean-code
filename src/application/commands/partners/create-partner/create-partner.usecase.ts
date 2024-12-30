import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import CreatePartnerCommand from './create-partner.command';

export default abstract class CreatePartnerUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createPartnerCommand: CreatePartnerCommand): Promise<PartnerDTO>;
}
