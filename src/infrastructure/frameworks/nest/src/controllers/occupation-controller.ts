import { Controller, Get } from '@nestjs/common';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import GetOccupationListQueryHandler from '@triumph/application/queries/get-occupation-list-query-handler';
import GetOccupationListQuery from '@triumph/application/queries/get-occupation-list-query';
import { Occupation } from '@triumph/domain/entity/occupation';

@Controller('occupations')
export default class OccupationController {
  constructor(private readonly occupationRepositoryReader: OccupationRepositoryReader) {}

  @Get()
  all(): Occupation[] {
    const getOccupationListUsecase = new GetOccupationListQueryHandler(this.occupationRepositoryReader);
    const occupations = getOccupationListUsecase.execute(new GetOccupationListQuery());

    return occupations;
  }
}
