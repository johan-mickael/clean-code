import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import ListSparePartsQuery from './list-spare-parts.query';

export default abstract class ListSparePartsUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listSparePartsQuery: ListSparePartsQuery): Promise<SparePartDTO[]>;
}
