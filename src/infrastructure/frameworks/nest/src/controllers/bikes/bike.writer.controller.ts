import { Response } from 'express';

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import CreateBikeCommand from '@triumph/application/commands/bikes/create-bike/create-bike.command';
import CreateBikeUseCase from '@triumph/application/commands/bikes/create-bike/create-bike.usecase';
import DeleteBikeCommand from '@triumph/application/commands/bikes/delete-bike/delete-bike.command';
import DeleteBikeUseCase from '@triumph/application/commands/bikes/delete-bike/delete-bike.usecase';
import UpdateBikeCommand from '@triumph/application/commands/bikes/update-bike/update-bike.command';
import UpdateBikeUseCase from '@triumph/application/commands/bikes/update-bike/update-bike.usecase';
import { BikeNotFoundError } from '@triumph/domain/errors/bikes/bike-not-found.error';
import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found.error';

@Controller('bikes')
export default class BikeWriterController {
  constructor(
    private readonly createBikeUseCase: CreateBikeUseCase,
    private readonly updateBikeUseCase: UpdateBikeUseCase,
    private readonly deleteBikeUseCase: DeleteBikeUseCase,
  ) {}

  @Post()
  async create(@Body() bikePayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createBikeCommand = new CreateBikeCommand(bikePayload);

    const createdBike = await this.createBikeUseCase.execute(createBikeCommand);

    if (createdBike) {
      return response.status(HttpStatus.CREATED).json(createdBike);
    }

    return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bikePayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const updateBikeCommand = new UpdateBikeCommand(id, bikePayload);

    try {
      const updatedBike = await this.updateBikeUseCase.execute(updateBikeCommand);

      if (updatedBike) {
        return response.json(updatedBike);
      }

      return response.sendStatus(HttpStatus.NOT_MODIFIED);
    } catch (error: any) {
      if (error instanceof BikeNotFoundError || error instanceof DealerNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') bikeId: string, @Res() response: Response): Promise<Response> {
    try {
      const deleteBikeCommand = new DeleteBikeCommand(bikeId);

      await this.deleteBikeUseCase.execute(deleteBikeCommand);

      return response.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error: any) {
      if (error instanceof BikeNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
