import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/bike-model-repository-reader';
import ListBikeModelsQueryHandler from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models-query-handler';
import ListBikeModelsQuery from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models-query';
import GetBikeModelByIdentifierQueryHandler from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier-query-handler';
import GetBikeModelByIdentifierQuery from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier-query';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found-error';
import { Response } from 'express';
import CreateBikeModelCommandHandler from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model-command-handler';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/bike-model-repository-writer';
import CreateBikeModelCommand from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model-command';
import UpdateBikeModelCommandHandler from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model-command-handler';
import UpdateBikeModelCommand from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model-command';
import DeleteBikeModelCommandHandler from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model-command-handler';
import DeleteBikeModelCommand from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model-command';

@Controller('bike-models')
export default class BikeModelController {
  constructor(
    private readonly bikeModelRepositoryReader: BikeModelRepositoryReader,
    private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const listBikeModelsUseCase = new ListBikeModelsQueryHandler(this.bikeModelRepositoryReader);
    const bikeModels = await listBikeModelsUseCase.execute(new ListBikeModelsQuery());

    return response.json(bikeModels);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getBikeModelUsecase = new GetBikeModelByIdentifierQueryHandler(this.bikeModelRepositoryReader);
    const getBikeModelQuery = new GetBikeModelByIdentifierQuery(id);

    try {
      const bikeModel = await getBikeModelUsecase.execute(getBikeModelQuery);
      return response.json(bikeModel);
    } catch (error: unknown) {
      if (error instanceof BikeModelNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  @Post()
  async create(@Body() bikeModelPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createBikeModelUseCase = new CreateBikeModelCommandHandler(this.bikeModelRepositoryWriter);
    const createBikeModelCommand = new CreateBikeModelCommand(bikeModelPayload);

    const createdBikeModel = await createBikeModelUseCase.execute(createBikeModelCommand);

    if (createdBikeModel) {
      return response.status(HttpStatus.CREATED).json(createdBikeModel);
    }

    return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bikeModelPayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const updateBikeModelUseCase = new UpdateBikeModelCommandHandler(this.bikeModelRepositoryWriter);
    const updateBikeModelCommand = new UpdateBikeModelCommand(id, bikeModelPayload);

    try {
      const updatedBikeModel = await updateBikeModelUseCase.execute(updateBikeModelCommand);

      if (updatedBikeModel) {
        return response.json(updatedBikeModel);
      }

      return response.sendStatus(HttpStatus.NOT_MODIFIED);
    } catch (error: any) {
      if (error instanceof BikeModelNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    try {
      const deleteBikeModelUseCase = new DeleteBikeModelCommandHandler(this.bikeModelRepositoryWriter);
      const deleteBikeModelCommand = new DeleteBikeModelCommand(id);

      await deleteBikeModelUseCase.execute(deleteBikeModelCommand);

      return response.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error: any) {
      if (error instanceof BikeModelNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
