import PartnerRepositoryReader from '@triumph/application/ports/repositories/readers/partner-repository-reader';
import GetPartnerByIdentifierQuery from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier-query';
import GetPartnerByIdentifierQueryHandler from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier-query-handler';
import ListPartnersQuery from '@triumph/application/queries/partners/list-partners/list-partners-query';
import ListPartnersQueryHandler from '@triumph/application/queries/partners/list-partners/list-partners-query-handler';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found-error';
import { Request, Response } from 'express';

export default class PartnerController {
  constructor(private readonly partnerRepositoryReader: PartnerRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listPartnersUsecase = new ListPartnersQueryHandler(this.partnerRepositoryReader);
    const partners = await listPartnersUsecase.execute(new ListPartnersQuery());

    return res.status(200).json(partners);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params;
    const getPartnerByIdentifierUsecase = new GetPartnerByIdentifierQueryHandler(this.partnerRepositoryReader);
    try {
      const partner = await getPartnerByIdentifierUsecase.execute(new GetPartnerByIdentifierQuery(id));
      return Promise.resolve(res.status(200).json(partner));
    } catch (error) {
      if (error instanceof PartnerNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }
}
