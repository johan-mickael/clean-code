import { error } from 'console';
import { Request, Response } from 'express';

import CreateBikeModelCommand from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model-command';
import CreateBikeModelCommandHandler from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model-command-handler';
import DeleteBikeModelCommand from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model-command';
import DeleteBikeModelCommandHandler from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model-command-handler';
import UpdateBikeModelCommand from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model-command';
import UpdateBikeModelCommandHandler from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model-command-handler';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/readers/bike-model-repository-reader';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/writers/bike-model-repository-writer';
import GetBikeModelByIdentifierQuery from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier-query';
import GetBikeModelByIdentifierQueryHandler from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier-query-handler';
import ListBikeModelsQuery from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models-query';
import ListBikeModelsQueryHandler from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models-query-handler';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found-error';

export default class BikeModelController {
  constructor(
    private readonly bikeModelRepositoryReader: BikeModelRepositoryReader,
    private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter,
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listBikeModelsUsecase = new ListBikeModelsQueryHandler(this.bikeModelRepositoryReader);
    const bikeModels = await listBikeModelsUsecase.execute(new ListBikeModelsQuery());

    return res.status(200).json(bikeModels);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id: bieModelId } = req.params;
    const getBikeModelByIdentifierUsecase = new GetBikeModelByIdentifierQueryHandler(this.bikeModelRepositoryReader);
    try {
      const bikeModel = await getBikeModelByIdentifierUsecase.execute(new GetBikeModelByIdentifierQuery(bieModelId));
      return Promise.resolve(res.status(200).json(bikeModel));
    } catch (error) {
      if (error instanceof BikeModelNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }

  async create(req: Request, res: Response, next: any): Promise<Response> {
    const createBikeModelUseCase = new CreateBikeModelCommandHandler(this.bikeModelRepositoryWriter);
    const createBikeModelCommand = new CreateBikeModelCommand(req.body);

    const createdBikeModel = await createBikeModelUseCase.execute(createBikeModelCommand);

    if (createdBikeModel) {
      return res.status(201).json(createdBikeModel);
    }

    return next(error);
  }

  async update(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const bikeModelToUpdateId = req.params.id;
      const updateBikeModelUseCase = new UpdateBikeModelCommandHandler(this.bikeModelRepositoryWriter);
      const updateBikeModelCommand = new UpdateBikeModelCommand(bikeModelToUpdateId, req.body);
      const updatedBikeModel = await updateBikeModelUseCase.execute(updateBikeModelCommand);

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
      const deleteBikeModelUseCase = new DeleteBikeModelCommandHandler(this.bikeModelRepositoryWriter);
      const deleteBikeModelCommand = new DeleteBikeModelCommand(bikeModelToDeleteId);
      await deleteBikeModelUseCase.execute(deleteBikeModelCommand);

      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof BikeModelNotFoundError) {
        return res.sendStatus(404);
      }

      return next(error);
    }
  }
}
