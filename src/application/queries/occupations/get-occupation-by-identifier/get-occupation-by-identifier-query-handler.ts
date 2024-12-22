import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import GetOccupationByIdentifierQuery from './get-occupation-by-identifier-query';

export default class GetOccupationByIdentifierQueryHandler {
  constructor(private readonly occupationRepository: OccupationRepositoryReader) { }

  async execute(query: GetOccupationByIdentifierQuery): Promise<Occupation> {
    return this.occupationRepository.getById(query.id);
  }
}
