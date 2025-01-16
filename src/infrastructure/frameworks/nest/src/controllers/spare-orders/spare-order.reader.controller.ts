import { Response } from 'express';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetSpareOrderByIdentifierQuery from '@triumph/application/queries/spare-orders/get-spare-order-by-identifier/get-spare-order-by-identifier.query';
import GetSpareOrderByIdentifierUseCase from '@triumph/application/queries/spare-orders/get-spare-order-by-identifier/get-spare-order-by-identifier.usecase';
import ListSpareOrdersQuery from '@triumph/application/queries/spare-orders/list-spare-orders/list-spare-orders.query';
import ListSpareOrdersUseCase from '@triumph/application/queries/spare-orders/list-spare-orders/list-spare-orders.usecase';
import { SpareOrderNotFoundError } from '@triumph/domain/errors/spare-orders/spare-order-not-found.error';

@Controller('spare-orders')
export default class SpareOrderReaderController {
  constructor(
    private readonly listSpareOrdersUseCase: ListSpareOrdersUseCase,
    private readonly getSpareOrderByIdentifierUseCase: GetSpareOrderByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const spareOrders = await this.listSpareOrdersUseCase.execute(new ListSpareOrdersQuery());

    return response.json(spareOrders);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getSpareOrderQuery = new GetSpareOrderByIdentifierQuery(id);

    try {
      const spareOrder = await this.getSpareOrderByIdentifierUseCase.execute(getSpareOrderQuery);
      return response.json(spareOrder);
    } catch (error: unknown) {
      if (error instanceof SpareOrderNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
