import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import ListOccupationsQuery from './list-occupations-query';
import { Occupation } from '@triumph/domain/entity/occupation';

export default class ListOccupationsQueryHandler {
  constructor(private readonly occupationRepositoryReader: OccupationRepositoryReader) { }

  async execute(query: ListOccupationsQuery): Promise<Occupation[]> {
    return await this.occupationRepositoryReader.list();
  }
}
