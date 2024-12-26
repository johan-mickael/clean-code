import OccupationDTO from '../../../dto-mappers/occupation-dto';
import OccupationDTOMapper from '../../../dto-mappers/occupation-dto-mapper';
import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import ListOccupationsQuery from './list-occupations-query';

export default class ListOccupationsQueryHandler {
  constructor(private readonly occupationRepositoryReader: OccupationRepositoryReader) {}

  async execute(query: ListOccupationsQuery): Promise<OccupationDTO[]> {
    const occupations = await this.occupationRepositoryReader.list();

    return occupations.map(OccupationDTOMapper.toDTO);
  }
}
