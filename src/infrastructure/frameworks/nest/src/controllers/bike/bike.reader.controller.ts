import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetBikeByIdentifierQuery from '@triumph/application/queries/bikes/get-bike-by-identifier/get-bike-by-identifier.query';
import GetBikeByIdentifierUseCase from '@triumph/application/queries/bikes/get-bike-by-identifier/get-bike-by-identifier.usecase';
import ListBikesQuery from '@triumph/application/queries/bikes/list-bikes/list-bikes.query';
import ListBikesUseCase from '@triumph/application/queries/bikes/list-bikes/list-bikes.usecase';
import { BikeNotFoundError } from '@triumph/domain/errors/bikes/bike-not-found.error';

@Controller('bikes')
export default class BikeReaderController {
  constructor(
    private readonly listBikesUseCase: ListBikesUseCase,
    private readonly getBikeByIdentifierUseCase: GetBikeByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const bikes = await this.listBikesUseCase.execute(new ListBikesQuery());

    return response.json(bikes);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getBikeQuery = new GetBikeByIdentifierQuery(id);

    try {
      const bike = await this.getBikeByIdentifierUseCase.execute(getBikeQuery);
      return response.json(bike);
    } catch (error: unknown) {
      if (error instanceof BikeNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
