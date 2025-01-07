import BikeDTO from '../../../interfaces/dtos/bike.dto';
import GetBikeByIdentifierQuery from './get-bike-by-identifier.query';

export default abstract class GetBikeByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws BikeNotFoundError
   */
  abstract execute(getBikeByIdentifierQuery: GetBikeByIdentifierQuery): Promise<BikeDTO>;
}
