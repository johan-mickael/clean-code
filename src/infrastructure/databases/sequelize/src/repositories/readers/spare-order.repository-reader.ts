import { Error as SequelizeError } from 'sequelize';

import SpareOrderRepositoryReader from '@triumph/application/ports/repositories/readers/spare-order-repository-reader';
import SpareOrder from '@triumph/domain/entity/spare-order';

import SpareOrderModel from '../../models/spare-order.model';

export default class SequelizeSpareOrderRepository implements SpareOrderRepositoryReader {
  async list(): Promise<SpareOrder[]> {
    const spareOrders = await SpareOrderModel.findAll();

    return spareOrders.map(
      (order) => new SpareOrder(order.id, order.spareId, order.quantity, order.price, order.deliveryDelayDays),
    );
  }

  async getById(id: string): Promise<SpareOrder | null> {
    try {
      const order = await SpareOrderModel.findByPk(id);

      if (!order) {
        return null;
      }

      return new SpareOrder(order.id, order.spareId, order.quantity, order.price, order.deliveryDelayDays);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
