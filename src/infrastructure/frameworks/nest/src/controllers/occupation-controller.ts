import { Controller, Get, Param } from '@nestjs/common';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import { Occupation } from '@triumph/domain/entity/occupation';
import ListOccupationsQueryHandler from '@triumph/application/queries/occupations/list-occupations/list-occupations-query-handler';
import ListOccupationsQuery from '@triumph/application/queries/occupations/list-occupations/list-occupations-query';
import GetOccupationByIdentifierQueryHandler from '@triumph/application/queries/occupations/get-occupation-by-identifier/get-occupation-by-identifier-query-handler';
import GetOccupationByIdentifierQuery from '@triumph/application/queries/occupations/get-occupation-by-identifier/get-occupation-by-identifier-query';
import SearchOccupationsByNameQueryHandler from '@triumph/application/queries/occupations/search-occupations-by-name/search-occupations-by-name-query-handler';
import SearchOccupationsByNameQuery from '@triumph/application/queries/occupations/search-occupations-by-name/search-occupation-by-name-query';

@Controller('occupations')
export default class OccupationController {
  constructor(private readonly occupationRepositoryReader: OccupationRepositoryReader) {}

  @Get()
  async list(): Promise<Occupation[]> {
    const listOccupationsUseCase = new ListOccupationsQueryHandler(this.occupationRepositoryReader);
    const occupations = await listOccupationsUseCase.execute(new ListOccupationsQuery());

    return occupations;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Occupation> {
    const getOccupationUsecase = new GetOccupationByIdentifierQueryHandler(this.occupationRepositoryReader);
    const getOccupationQuery = new GetOccupationByIdentifierQuery(parseInt(id));
    const occupation = await getOccupationUsecase.execute(getOccupationQuery);

    return occupation;
  }

  @Get('search/:name')
  async searchByName(@Param('name') keyword: string): Promise<Occupation[]> {
    const searchOccupationUsecase = new SearchOccupationsByNameQueryHandler(this.occupationRepositoryReader);
    const searchOccupationQuery = new SearchOccupationsByNameQuery(keyword);
    const occupations = await searchOccupationUsecase.execute(searchOccupationQuery);

    return occupations;
  }
}
