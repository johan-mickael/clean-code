import { Op } from 'sequelize';

import CustomerEventRepositoryReader from '@triumph/application/ports/repositories/reader/customer-event-repository-reader';
import { CustomerEvent } from '@triumph/domain/entity/customer-event';
import { Event as DomainEvent } from '@triumph/domain/entity/event';

import { toDomainCustomer } from '../../../../../adapters/customer-adapter';
import CustomerEventModel from '../../models/customer-event.model';
import CustomerModel from '../../models/customer.model';
import EventModel from '../../models/event.model';

export default class SequelizeCustomerEventRepositoryReader implements CustomerEventRepositoryReader {
  async list(): Promise<CustomerEvent[]> {
    const customerEvents = await CustomerEventModel.findAll({
      include: [
        {
          model: CustomerModel,
          as: 'customer',
        },
        {
          model: EventModel,
          as: 'event',
        },
      ],
    });

    return customerEvents.map(
      (customerEvent) =>
        new CustomerEvent(
          customerEvent.id,
          customerEvent.eventDate,
          customerEvent.description,
          toDomainCustomer(customerEvent.customer),
          this.mapEvent(customerEvent.event),
        ),
    );
  }

  async getByCustomerId(customerId: number): Promise<CustomerEvent[]> {
    const customerEvents = await CustomerEventModel.findAll({
      where: {
        customerId,
      },
      include: [
        {
          model: CustomerModel,
          as: 'customer',
        },
        {
          model: EventModel,
          as: 'event',
        },
      ],
    });

    return customerEvents.map((customerEvent) => {
      return new CustomerEvent(
        customerEvent.id,
        customerEvent.eventDate,
        customerEvent.description,
        toDomainCustomer(customerEvent.customer),
        this.mapEvent(customerEvent.event),
      );
    });
  }

  async getById(customerEventId: number): Promise<CustomerEvent | null> {
    const customerEvent = await CustomerEventModel.findByPk(customerEventId, {
      include: [
        { model: CustomerModel, as: 'customer' },
        { model: EventModel, as: 'event' },
      ],
    });

    if (!customerEvent) return null;

    return new CustomerEvent(
      customerEvent.id,
      customerEvent.eventDate,
      customerEvent.description,
      toDomainCustomer(customerEvent.customer),
      this.mapEvent(customerEvent.event),
    );
  }

  async search(keyword: string): Promise<CustomerEvent[]> {
    const customerEvents = await CustomerEventModel.findAll({
      where: {
        description: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      include: [
        { model: CustomerModel, as: 'customer' },
        { model: EventModel, as: 'event' },
      ],
    });

    return customerEvents.map(
      (customerEvent) =>
        new CustomerEvent(
          customerEvent.id,
          customerEvent.eventDate,
          customerEvent.description,
          toDomainCustomer(customerEvent.customer),
          this.mapEvent(customerEvent.event),
        ),
    );
  }

  private mapEvent(event: EventModel): DomainEvent {
    return new DomainEvent(event.id, event.name);
  }
}
