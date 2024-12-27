import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import GetOccupationByIdentifierQuery from '@triumph/application/queries/occupations/get-occupation-by-identifier/get-occupation-by-identifier-query';
import GetOccupationByIdentifierQueryHandler from '@triumph/application/queries/occupations/get-occupation-by-identifier/get-occupation-by-identifier-query-handler';
import ListOccupationsQuery from '@triumph/application/queries/occupations/list-occupations/list-occupations-query';
import ListOccupationsQueryHandler from '@triumph/application/queries/occupations/list-occupations/list-occupations-query-handler';
import SearchOccupationsByNameQuery from '@triumph/application/queries/occupations/search-occupations-by-name/search-occupations-by-name-query';
import SearchOccupationsByNameQueryHandler from '@triumph/application/queries/occupations/search-occupations-by-name/search-occupations-by-name-query-handler';
import { OccupationNotFoundError } from '@triumph/domain/errors/occupations/occupation-not-found-error';
import { Request, Response } from 'express';

export default class OccupationController {
  constructor(private readonly OccupationRepositoryReader: OccupationRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listOccupationsUsecase = new ListOccupationsQueryHandler(this.OccupationRepositoryReader);
    const occupations = await listOccupationsUsecase.execute(new ListOccupationsQuery());

    return res.status(200).json(occupations);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params;
    const getOccupationByIdentifierUsecase = new GetOccupationByIdentifierQueryHandler(this.OccupationRepositoryReader);
    try {
      const occupation = await getOccupationByIdentifierUsecase.execute(new GetOccupationByIdentifierQuery(id));
      return Promise.resolve(res.status(200).json(occupation));
    } catch (error) {
      if (error instanceof OccupationNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }

  async searchByName(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;
    const searchOccupationsByNameUseCase = new SearchOccupationsByNameQueryHandler(this.OccupationRepositoryReader);
    const occupations = await searchOccupationsByNameUseCase.execute(new SearchOccupationsByNameQuery(keyword));

    return res.status(200).json(occupations);
  }
}
