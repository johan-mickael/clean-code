import { error } from 'console';
import { Request, Response } from 'express';

import CreateBikeModelCommand from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model.command';
import CreateBikeModelUseCase from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model.usecase';
import DeleteBikeModelCommand from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model.command';
import DeleteBikeModelUseCase from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model.usecase';
import UpdateBikeModelCommand from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model.command';
import UpdateBikeModelUseCase from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model.usecase';
import GetBikeModelByIdentifierQuery from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.query';
import GetBikeModelByIdentifierUseCase from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.usecase';
import ListBikeModelsQuery from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.query';
import ListBikeModelsUseCase from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.usecase';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';

export default class BikeModelController {
  constructor(
    private readonly listBikeModelsUseCase: ListBikeModelsUseCase,
    private readonly getBikeModelByIdentifierUseCase: GetBikeModelByIdentifierUseCase,
    private readonly createBikeModelUseCase: CreateBikeModelUseCase,
    private readonly updateBikeModelUseCase: UpdateBikeModelUseCase,
    private readonly deleteBikeModelUseCase: DeleteBikeModelUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const bikeModels = await this.listBikeModelsUseCase.execute(new ListBikeModelsQuery());

    return res.status(200).json(bikeModels);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id: bikeModelId } = req.params;
    try {
      const getBikeModelByIdentifierQuery = new GetBikeModelByIdentifierQuery(bikeModelId);
      const bikeModel = await this.getBikeModelByIdentifierUseCase.execute(getBikeModelByIdentifierQuery);
      return Promise.resolve(res.status(200).json(bikeModel));
    } catch (error) {
      if (error instanceof BikeModelNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }

  async create(req: Request, res: Response, next: any): Promise<Response> {
    const createBikeModelCommand = new CreateBikeModelCommand(req.body);

    const createdBikeModel = await this.createBikeModelUseCase.execute(createBikeModelCommand);

    if (createdBikeModel) {
      return res.status(201).json(createdBikeModel);
    }

    return next(error);
  }

  async update(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const bikeModelToUpdateId = req.params.id;
      const updateBikeModelCommand = new UpdateBikeModelCommand(bikeModelToUpdateId, req.body);
      const updatedBikeModel = await this.updateBikeModelUseCase.execute(updateBikeModelCommand);

      return res.status(200).json(updatedBikeModel);
    } catch (error) {
      if (error instanceof BikeModelNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const bikeModelToDeleteId = req.params.id;
      const deleteBikeModelCommand = new DeleteBikeModelCommand(bikeModelToDeleteId);
      await this.deleteBikeModelUseCase.execute(deleteBikeModelCommand);

      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof BikeModelNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }
}
