import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import CreateSparePartCommand from './create-spare-part.command';

export default abstract class CreateSparePartUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createSparePartCommand: CreateSparePartCommand): Promise<SparePartDTO>;
}
