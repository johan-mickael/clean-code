import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import GetBikeModelByIdentifierQuery from './get-bike-model-by-identifier.query';

export default abstract class GetBikeModelByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws BikeModelNotFoundError
   */
  abstract execute(getBikeModelByIdentifierQuery: GetBikeModelByIdentifierQuery): Promise<BikeModelDTO>;
}
