import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import BusEmitter from '@triumph/application/ports/message-broker/bus-emitter.interface';
import GetBikeModelByIdentifierQuery from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.query';
import GetBikeModelByIdentifierUseCase from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.usecase';
import ListBikeModelsQuery from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.query';
import ListBikeModelsUseCase from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.usecase';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';
import CheckBikesMaintenancesEvent from '@triumph/domain/events/maintenances/check-bikes-maintenances.event';

@Controller('bike-models')
export default class BikeModelReaderController {
  constructor(
    private readonly listBikeModelsUseCase: ListBikeModelsUseCase,
    private readonly getBikeModelByIdentifierUseCase: GetBikeModelByIdentifierUseCase,
    private readonly busEmitter: BusEmitter,
  ) {}

  @Get('test')
  async test(@Res() response: Response): Promise<Response> {
    const event = new CheckBikesMaintenancesEvent();

    event.setPayload(['b266c768-3b88-408f-84f9-24c418ce03e5', 'b266c768-3b88-408f-84f9-24c418ce03e5']);

    this.busEmitter.emit(event);
    return response.json({ message: 'Hello, world!' });
  }

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
