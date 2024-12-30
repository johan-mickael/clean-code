import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import ListBikeModelsQuery from './list-bike-models.query';

export default abstract class ListBikeModelsUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(query: ListBikeModelsQuery): Promise<BikeModelDTO[]>;
}
