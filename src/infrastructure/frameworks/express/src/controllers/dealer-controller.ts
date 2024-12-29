import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer-repository-reader';
import GetDealerByIdentifierQuery from '@triumph/application/queries/dealers/get-dealer-by-identifier/get-dealer-by-identifier-query';
import GetDealerByIdentifierQueryHandler from '@triumph/application/queries/dealers/get-dealer-by-identifier/get-dealer-by-identifier-query-handler';
import ListDealersQuery from '@triumph/application/queries/dealers/list-dealers/list-dealers-query';
import ListDealersQueryHandler from '@triumph/application/queries/dealers/list-dealers/list-dealers-query-handler';
import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found-error';
import { Request, Response } from 'express';

export default class DealerController {
  constructor(private readonly dealerRepositoryReader: DealerRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listDealersUsecase = new ListDealersQueryHandler(this.dealerRepositoryReader);
    const dealers = await listDealersUsecase.execute(new ListDealersQuery());

    return res.status(200).json(dealers);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params;
    const getDealerByIdentifierUsecase = new GetDealerByIdentifierQueryHandler(this.dealerRepositoryReader);
    try {
      const dealer = await getDealerByIdentifierUsecase.execute(new GetDealerByIdentifierQuery(id));
      return Promise.resolve(res.status(200).json(dealer));
    } catch (error) {
      if (error instanceof DealerNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }
}
