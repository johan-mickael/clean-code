import { Request, Response } from 'express';
import GetClientsQueryHandler from '../../../../../application/queries/get-clients-query-handler';
import GetClientsQuery from '../../../../../application/queries/get-clients-query';
import { Client } from '../../../../../domain/entity/Client';

export default class ClientController {
  constructor(
    private readonly getClientsQueryHandler: GetClientsQueryHandler,
  ) {}

  all(req: Request, res: Response): Response {
    const getClientsQuery = new GetClientsQuery();

    const clients = this.getClientsQueryHandler.execute(getClientsQuery);

    return res.status(200).json(clients);
  }
}
