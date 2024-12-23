import { Occupation } from '@triumph/domain/entity/occupation';

export default abstract class OccupationRepositoryReader {
  abstract list(): Promise<Occupation[]>;
  abstract getById(id: string): Promise<Occupation | null>;
  abstract searchByName(name: string): Promise<Occupation[]>;
}
