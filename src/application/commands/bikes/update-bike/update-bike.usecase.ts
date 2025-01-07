import BikeDTO from '../../../interfaces/dtos/bike.dto';
import UpdateBikeCommand from './update-bike.command';

export default abstract class UpdateBikeUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateBikeCommand: UpdateBikeCommand): Promise<BikeDTO>;
}
