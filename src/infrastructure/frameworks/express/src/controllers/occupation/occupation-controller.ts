import { Request, Response } from 'express';

import OccupationRepositoryReader from '@triumph/application/ports/repositories/reader/occupation-repository-reader';
import SearchOccupationQuery from '@triumph/application/queries/occupation/filter/search-occupation-query';
import SearchoccupationQueryHandler from '@triumph/application/queries/occupation/filter/search-occupation-query-handler';
import GetOccupationListQuery from '@triumph/application/queries/occupation/get/get-occupation-list-query';
import GetOccupationListQueryHandler from '@triumph/application/queries/occupation/get/get-occupation-list-query-handler';
import GetOccupationQuery from '@triumph/application/queries/occupation/get/get-occupation-query';
import GetOccupationQueryHandler from '@triumph/application/queries/occupation/get/get-occupation-query-handler';

export default class OccupationController {
  constructor(private readonly OccupationRepositoryReader: OccupationRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listOccupationUsecase = new GetOccupationListQueryHandler(this.OccupationRepositoryReader);
    const occupations = await listOccupationUsecase.execute(new GetOccupationListQuery());
    return res.status(200).json(occupations);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getOccupationUsecase = new GetOccupationQueryHandler(this.OccupationRepositoryReader);
    const occupation = await getOccupationUsecase.execute(new GetOccupationQuery(numericId));

    return res.status(200).json(occupation);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;
    const searchOccupationUsecase = new SearchoccupationQueryHandler(this.OccupationRepositoryReader);
    const occupations = await searchOccupationUsecase.execute(new SearchOccupationQuery(keyword));

    return res.status(200).json(occupations);
  }
}
