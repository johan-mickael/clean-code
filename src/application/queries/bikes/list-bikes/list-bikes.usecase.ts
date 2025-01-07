import BikeDTO from '../../../interfaces/dtos/bike.dto';
import ListBikesQuery from './list-bikes.query';

export default abstract class ListBikesUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listBikesQuery: ListBikesQuery): Promise<BikeDTO[]>;
}
