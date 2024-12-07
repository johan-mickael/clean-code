import { Request, Response } from 'express';
import GetOccupationListQuery from '@triumph/application/queries/get-customer-list-query';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import GetOccupationListQueryHandler from '@triumph/application/queries/get-occupation-list-query-handler';

export default class OccupationController {
  constructor(private readonly OccupationRepositoryReader: OccupationRepositoryReader) {}

  all(req: Request, res: Response): Response {
    const listOccupationUsecase = new GetOccupationListQueryHandler(this.OccupationRepositoryReader);
    const occupations = listOccupationUsecase.execute(new GetOccupationListQuery());

    return res.status(200).json(occupations);
  }
}
