import { Request, Response } from 'express';

import OccupationRepositoryWriter from '@triumph/application/ports/repositories/writer/occupation-repository-writer';
import CreateOccupationCommand from '@triumph/application/queries/occupation/add/create-occupation-command';
import CreateOccupationCommandHandler from '@triumph/application/queries/occupation/add/create-occupation-handler';

export default class OccupationControllerWriter {
  constructor(private readonly OccupationRepositoryWriter: OccupationRepositoryWriter) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const searchOccupationUsecase = new CreateOccupationCommandHandler(this.OccupationRepositoryWriter);
    const occupations = await searchOccupationUsecase.execute(new CreateOccupationCommand(name));

    return Promise.resolve(res.status(201).json(occupations));
  }
}
