import { Response } from 'express';

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import CreateSpareOrderCommand from '@triumph/application/commands/spare-orders/create-spare-order/create-spare-order.command';
import CreateSpareOrderUseCase from '@triumph/application/commands/spare-orders/create-spare-order/create-spare-order.usecase';
import DeleteSpareOrderCommand from '@triumph/application/commands/spare-orders/delete-spare-order/delete-spare-order.command';
import DeleteSpareOrderUseCase from '@triumph/application/commands/spare-orders/delete-spare-order/delete-spare-order.usecase';
import UpdateSpareOrderCommand from '@triumph/application/commands/spare-orders/update-spare-order/update-spare-order.command';
import UpdateSpareOrderUseCase from '@triumph/application/commands/spare-orders/update-spare-order/update-spare-order.usecase';
import { SpareOrderNotFoundError } from '@triumph/domain/errors/spare-orders/spare-order-not-found.error';

@Controller('spare-orders')
export default class SpareOrderWriterController {
  constructor(
    private readonly createSpareOrderUseCase: CreateSpareOrderUseCase,
    private readonly updateSpareOrderUseCase: UpdateSpareOrderUseCase,
    private readonly deleteSpareOrderUseCase: DeleteSpareOrderUseCase,
  ) {}

  @Post()
  async create(@Body() spareOrderPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createSpareOrderCommand = new CreateSpareOrderCommand(spareOrderPayload);

    const createdSpareOrder = await this.createSpareOrderUseCase.execute(createSpareOrderCommand);

    if (createdSpareOrder) {
      return response.status(HttpStatus.CREATED).json(createdSpareOrder);
    }

    return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() spareOrderPayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const updateSpareOrderCommand = new UpdateSpareOrderCommand(id, spareOrderPayload);

    try {
      const updatedSpareOrder = await this.updateSpareOrderUseCase.execute(updateSpareOrderCommand);

      if (updatedSpareOrder) {
        return response.json(updatedSpareOrder);
      }

      return response.sendStatus(HttpStatus.NOT_MODIFIED);
    } catch (error: any) {
      if (error instanceof SpareOrderNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') spareOrderId: string, @Res() response: Response): Promise<Response> {
    try {
      const deleteSpareOrderCommand = new DeleteSpareOrderCommand(spareOrderId);

      await this.deleteSpareOrderUseCase.execute(deleteSpareOrderCommand);

      return response.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error: any) {
      if (error instanceof SpareOrderNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
