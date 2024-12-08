import { Controller, Get, Param } from '@nestjs/common';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import GetOccupationListQueryHandler from '@triumph/application/queries/get-occupation-list-query-handler';
import GetOccupationListQuery from '@triumph/application/queries/get-occupation-list-query';
import { Occupation } from '@triumph/domain/entity/occupation';
import GetOccupationQueryHandler from '@triumph/application/queries/get-occupation-query-handler';
import GetOccupationQuery from '@triumph/application/queries/get-occupation-query';
import { parse } from 'path';
import SearchoccupationQueryHandler from '@triumph/application/queries/search-occupation-query-handler';
import SearchOccupationQuery from '@triumph/application/queries/search-occupation-query';

@Controller('occupations')
export default class OccupationController {
  constructor(private readonly occupationRepositoryReader: OccupationRepositoryReader) {}

  @Get()
  async list(): Promise<Occupation[]> {
    const getOccupationListUsecase = new GetOccupationListQueryHandler(this.occupationRepositoryReader);
    const occupations = await getOccupationListUsecase.execute(new GetOccupationListQuery());

    return occupations;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Occupation> {
    const getOccupationUsecase = new GetOccupationQueryHandler(this.occupationRepositoryReader);
    const getOccupationQuery = new GetOccupationQuery(parseInt(id));
    const occupation = await getOccupationUsecase.execute(getOccupationQuery);

    return occupation;
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string): Promise<Occupation[]> {
    const searchOccupationUsecase = new SearchoccupationQueryHandler(this.occupationRepositoryReader);
    const searchOccupationQuery = new SearchOccupationQuery(keyword);
    const occupations = await searchOccupationUsecase.execute(searchOccupationQuery);

    return occupations;
  }
}
