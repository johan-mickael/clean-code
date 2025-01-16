import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import UpdateSpareOrderCommand from './update-spare-order.command';

export default abstract class UpdateSpareOrderUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateSpareOrderCommand: UpdateSpareOrderCommand): Promise<SpareOrderDTO>;
}
