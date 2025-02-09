import { Error as SequelizeError } from 'sequelize';

import SpareOrderDTO from '@triumph/application/interfaces/dtos/spare-order.dto';
import SpareOrderDTOMapper from '@triumph/application/interfaces/mappers/spare-order.dto-mapper';
import SpareOrderRepositoryWriter from '@triumph/application/ports/repositories/writers/spare-order-repository-writer';
import SpareOrder from '@triumph/domain/entity/spare-order';
import { SpareOrderNotFoundError } from '@triumph/domain/errors/spare-orders/spare-order-not-found.error';

import SpareOrderModel from '../../models/spare-order.model';

export default class SequelizeSpareOrderRepositoryWriter implements SpareOrderRepositoryWriter {
  async create(spareOrderDTO: SpareOrderDTO): Promise<SpareOrder> {
    const spareOrderModel = await SpareOrderModel.create({
      spareId: spareOrderDTO.spareId,
      quantity: spareOrderDTO.quantity,
      price: spareOrderDTO.price,
      deliveryDelayDays: spareOrderDTO.deliveryDelayDays,
    });

    return SpareOrderDTOMapper.toEntity(spareOrderModel);
  }

  async update(id: string, spareOrderDTO: SpareOrderDTO): Promise<SpareOrder> {
    try {
      const [affectedOrderCount, updatedOrders] = await SpareOrderModel.update(
        {
          spareId: spareOrderDTO.spareId,
          quantity: spareOrderDTO.quantity,
          price: spareOrderDTO.price,
          deliveryDelayDays: spareOrderDTO.deliveryDelayDays,
        },
        {
          where: { id },
          returning: true,
        },
      );

      if (affectedOrderCount === 0) {
        throw new SpareOrderNotFoundError();
      }

      const updatedOrder = updatedOrders[0];
      return SpareOrderDTOMapper.toEntity(updatedOrder);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new SpareOrderNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedOrderCount = await SpareOrderModel.destroy({
        where: { id },
      });

      if (deletedOrderCount === 0) {
        throw new SpareOrderNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new SpareOrderNotFoundError();
      }

      throw error;
    }
  }
}