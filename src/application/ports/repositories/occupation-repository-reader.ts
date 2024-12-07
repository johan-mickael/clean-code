import { Occupation } from '@triumph/domain/entity/occupation';

export default abstract class OccupationRepositoryReader {
  abstract list(): Occupation[];
}
