import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import ListOccupationsQueryHandler from '@triumph/application/queries/occupations/list-occupations/list-occupations-query-handler';
import ListOccupationsQuery from '@triumph/application/queries/occupations/list-occupations/list-occupations-query';
import GetOccupationByIdentifierQueryHandler from '@triumph/application/queries/occupations/get-occupation-by-identifier/get-occupation-by-identifier-query-handler';
import GetOccupationByIdentifierQuery from '@triumph/application/queries/occupations/get-occupation-by-identifier/get-occupation-by-identifier-query';
import SearchOccupationsByNameQueryHandler from '@triumph/application/queries/occupations/search-occupations-by-name/search-occupations-by-name-query-handler';
import { OccupationNotFoundError } from '@triumph/domain/errors/occupations/occupation-not-found-error';
import { Response } from 'express';
import SearchOccupationsByNameQuery from '@triumph/application/queries/occupations/search-occupations-by-name/search-occupations-by-name-query';

@Controller('occupations')
export default class OccupationController {
  constructor(private readonly occupationRepositoryReader: OccupationRepositoryReader) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const listOccupationsUseCase = new ListOccupationsQueryHandler(this.occupationRepositoryReader);
    const occupations = await listOccupationsUseCase.execute(new ListOccupationsQuery());

    return response.json(occupations);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getOccupationUsecase = new GetOccupationByIdentifierQueryHandler(this.occupationRepositoryReader);
    const getOccupationQuery = new GetOccupationByIdentifierQuery(id);

    try {
      const occupation = await getOccupationUsecase.execute(getOccupationQuery);
      return response.json(occupation);
    } catch (error: unknown) {
      if (error instanceof OccupationNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  @Get('search/:name')
  async searchByName(@Param('name') keyword: string, @Res() response: Response): Promise<Response> {
    const searchOccupationUsecase = new SearchOccupationsByNameQueryHandler(this.occupationRepositoryReader);
    const searchOccupationQuery = new SearchOccupationsByNameQuery(keyword);
    const occupations = await searchOccupationUsecase.execute(searchOccupationQuery);

    return response.json(occupations);
  }
}
