import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import CreateBikeModelCommand from './create-bike-model.command';

export default abstract class CreateBikeModelUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createBikeModelCommand: CreateBikeModelCommand): Promise<BikeModelDTO>;
}
