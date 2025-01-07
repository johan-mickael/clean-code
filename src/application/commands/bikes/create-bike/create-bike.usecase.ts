import BikeDTO from '../../../interfaces/dtos/bike.dto';
import CreateBikeCommand from './create-bike.command';

export default abstract class CreateBikeUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createBikeCommand: CreateBikeCommand): Promise<BikeDTO>;
}
