import { Response } from 'express';

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
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

@Controller('bike-models')
export default class BikeModelController {
  constructor(
    private readonly listBikeModelsUseCase: ListBikeModelsUseCase,
    private readonly getBikeModelByIdentifierUseCase: GetBikeModelByIdentifierUseCase,
    private readonly createBikeModelUseCase: CreateBikeModelUseCase,
    private readonly updateBikeModelUseCase: UpdateBikeModelUseCase,
    private readonly deleteBikeModelUseCase: DeleteBikeModelUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const bikeModels = await this.listBikeModelsUseCase.execute(new ListBikeModelsQuery());

    return response.json(bikeModels);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getBikeModelQuery = new GetBikeModelByIdentifierQuery(id);

    try {
      const bikeModel = await this.getBikeModelByIdentifierUseCase.execute(getBikeModelQuery);
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
    const createBikeModelCommand = new CreateBikeModelCommand(bikeModelPayload);

    const createdBikeModel = await this.createBikeModelUseCase.execute(createBikeModelCommand);

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
    const updateBikeModelCommand = new UpdateBikeModelCommand(id, bikeModelPayload);

    try {
      const updatedBikeModel = await this.updateBikeModelUseCase.execute(updateBikeModelCommand);

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
      const deleteBikeModelCommand = new DeleteBikeModelCommand(id);

      await this.deleteBikeModelUseCase.execute(deleteBikeModelCommand);

      return response.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error: any) {
      if (error instanceof BikeModelNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
