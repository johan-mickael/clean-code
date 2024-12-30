import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import UpdateBikeModelCommand from './update-bike-model.command';

export default abstract class UpdateBikeModelUseCase {
  /**
   * @throws InvalidCommandError
   * @throws BikeModelNotFoundError
   */
  abstract execute(updateBikeModelCommand: UpdateBikeModelCommand): Promise<BikeModelDTO>;
}
