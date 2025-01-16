import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import CreateSparePartCommand from '@triumph/application/commands/spare-parts/create-spare-part/create-spare-part.command';
import CreateSparePartUseCase from '@triumph/application/commands/spare-parts/create-spare-part/create-spare-part.usecase';
import DeleteSparePartCommand from '@triumph/application/commands/spare-parts/delete-spare-part/delete-spare-part.command';
import DeleteSparePartUseCase from '@triumph/application/commands/spare-parts/delete-spare-part/delete-spare-part.usecase';
import UpdateSparePartCommand from '@triumph/application/commands/spare-parts/update-spare-part/update-spare-part.command';
import UpdateSparePartUseCase from '@triumph/application/commands/spare-parts/update-spare-part/update-spare-part.usecase';
import { SparePartNotFoundError } from '@triumph/domain/errors/spare-parts/spare-part-not-found.error';

@Controller('spare-parts')
export default class SparePartWriterController {
  constructor(
    private readonly createSparePartUseCase: CreateSparePartUseCase,
    private readonly updateSparePartUseCase: UpdateSparePartUseCase,
    private readonly deleteSparePartUseCase: DeleteSparePartUseCase,
  ) {}

  @Post()
  async create(@Body() sparePartPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createSparePartCommand = new CreateSparePartCommand(sparePartPayload);

    const createdSparePart = await this.createSparePartUseCase.execute(createSparePartCommand);

    if (createdSparePart) {
      return response.status(HttpStatus.CREATED).json(createdSparePart);
    }

    return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() sparePartPayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const updateSparePartCommand = new UpdateSparePartCommand(id, sparePartPayload);

    try {
      const updatedSparePart = await this.updateSparePartUseCase.execute(updateSparePartCommand);

      if (updatedSparePart) {
        return response.json(updatedSparePart);
      }

      return response.sendStatus(HttpStatus.NOT_MODIFIED);
    } catch (error: any) {
      if (error instanceof SparePartNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') sparePartId: string, @Res() response: Response): Promise<Response> {
    try {
      const deleteSparePartCommand = new DeleteSparePartCommand(sparePartId);

      await this.deleteSparePartUseCase.execute(deleteSparePartCommand);

      return response.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error: any) {
      if (error instanceof SparePartNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
