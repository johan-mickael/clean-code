import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetBikeModelByIdentifierQuery from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.query';
import GetBikeModelByIdentifierUseCase from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.usecase';
import ListBikeModelsQuery from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.query';
import ListBikeModelsUseCase from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.usecase';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';

@Controller('bike-models')
export default class BikeModelReaderController {
  constructor(
    private readonly listBikeModelsUseCase: ListBikeModelsUseCase,
    private readonly getBikeModelByIdentifierUseCase: GetBikeModelByIdentifierUseCase,
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
}
