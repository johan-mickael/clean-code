import { Occupation } from '@triumph/domain/entity/occupation';
import BaseRepositoryReader from './base-repository-reader';

export default abstract class OccupationRepositoryReader extends BaseRepositoryReader<Occupation> {
  abstract searchByName(name: string): Promise<Occupation[]>;
}
