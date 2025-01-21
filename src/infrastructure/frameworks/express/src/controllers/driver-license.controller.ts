import { Request, Response } from 'express';

import CreatePartnerCommand from '@triumph/application/commands/partners/create-partner/create-partner.command';
import CreatePartnerCommandHandler from '@triumph/application/commands/partners/create-partner/create-partner.command-handler';
import CreatePartnerUseCase from '@triumph/application/commands/partners/create-partner/create-partner.usecase';
import DeletePartnerCommand from '@triumph/application/commands/partners/delete-partner/delete-partner.command';
import DeletePartnerCommandHandler from '@triumph/application/commands/partners/delete-partner/delete-partner.command-handler';
import DeletePartnerUseCase from '@triumph/application/commands/partners/delete-partner/delete-partner.usecase';
import UpdatePartnerCommand from '@triumph/application/commands/partners/update-partner/update-partner.command';
import UpdatePartnerCommandHandler from '@triumph/application/commands/partners/update-partner/update-partner.command-handler';
import UpdatePartnerUseCase from '@triumph/application/commands/partners/update-partner/update-partner.usecase';
import GetPartnerByIdentifierQuery from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.query';
import GetPartnerByIdentifierUseCase from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.usecase';
import ListPartnersQuery from '@triumph/application/queries/partners/list-partners/list-partners.query';
import ListPartnersUseCase from '@triumph/application/queries/partners/list-partners/list-partners.usecase';
import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found.error';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found.error';

export default class PartnerController {
  constructor(
    private readonly listPartnersUseCase: ListPartnersUseCase,
    private readonly getPartnerByIdentifierUseCase: GetPartnerByIdentifierUseCase,
    private readonly createPartnerUseCase: CreatePartnerUseCase,
    private readonly updatePartnerUseCase: UpdatePartnerUseCase,
    private readonly deletePartnerUseCase: DeletePartnerUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const partners = await this.listPartnersUseCase.execute(new ListPartnersQuery());

    return res.status(200).json(partners);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params;
    try {
      const partner = await this.getPartnerByIdentifierUseCase.execute(new GetPartnerByIdentifierQuery(id));
      return Promise.resolve(res.status(200).json(partner));
    } catch (error) {
      if (error instanceof PartnerNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }

  async create(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const createPartnerCommand = new CreatePartnerCommand(req.body);
      const createdPartner = await this.createPartnerUseCase.execute(createPartnerCommand);

      return res.status(201).json(createdPartner);
    } catch (error) {
      if (error instanceof DealerNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: any): Promise<Response> {
    const { id: partnerIdToUpdate } = req.params;
    try {
      const updatePartnerCommand = new UpdatePartnerCommand(partnerIdToUpdate, req.body);
      const updatedPartner = await this.updatePartnerUseCase.execute(updatePartnerCommand);

      return res.status(200).json(updatedPartner);
    } catch (error) {
      if (error instanceof PartnerNotFoundError || error instanceof DealerNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: any): Promise<Response> {
    const { id: partnerIdToDelete } = req.params;
    try {
      const deletePartnerCommand = new DeletePartnerCommand(partnerIdToDelete);
      await this.deletePartnerUseCase.execute(deletePartnerCommand);

      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof PartnerNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }
}
