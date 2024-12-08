import { Request, Response } from 'express';
import GetOccupationListQuery from '@triumph/application/queries/get-customer-list-query';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import GetOccupationListQueryHandler from '@triumph/application/queries/get-occupation-list-query-handler';
import GetOccupationQuery from '@triumph/application/queries/get-occupation-query';
import GetOccupationQueryHandler from '@triumph/application/queries/get-occupation-query-handler';
import SearchoccupationQueryHandler from '@triumph/application/queries/search-occupation-query-handler';
import SearchOccupationQuery from '@triumph/application/queries/search-occupation-query';

export default class OccupationController {
  constructor(private readonly OccupationRepositoryReader: OccupationRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listOccupationUsecase = new GetOccupationListQueryHandler(this.OccupationRepositoryReader);
    const occupations = await listOccupationUsecase.execute(new GetOccupationListQuery());

    return Promise.resolve(res.status(200).json(occupations));
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getOccupationUsecase = new GetOccupationQueryHandler(this.OccupationRepositoryReader);
    const occupation = await getOccupationUsecase.execute(new GetOccupationQuery(parseInt(id)));

    return Promise.resolve(res.status(200).json(occupation));
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;
    const searchOccupationUsecase = new SearchoccupationQueryHandler(this.OccupationRepositoryReader);
    const occupations = await searchOccupationUsecase.execute(new SearchOccupationQuery(keyword));

    return Promise.resolve(res.status(200).json(occupations));
  }
}
