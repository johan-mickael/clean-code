import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import UpdateSparePartCommand from './update-spare-part.command';

export default abstract class UpdateSparePartUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateSparePartCommand: UpdateSparePartCommand): Promise<SparePartDTO>;
}
