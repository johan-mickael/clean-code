import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import CreateSpareOrderCommand from './create-spare-order.command';

export default abstract class CreateSpareOrderUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createSpareOrderCommand: CreateSpareOrderCommand): Promise<SpareOrderDTO>;
}
