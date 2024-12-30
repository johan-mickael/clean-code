import { Error as SequelizeError } from 'sequelize';

import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer.repository-reader';
import { Dealer } from '@triumph/domain/entity/dealer';

import DealerModel from '../../models/dealer.model';

export default class SequelizeDealerRepository implements DealerRepositoryReader {
  async list(): Promise<Dealer[]> {
    const dealers = await DealerModel.findAll();

    return dealers.map((dealer) => new Dealer(dealer.id, dealer.name, dealer.address));
  }

  async getById(id: string): Promise<Dealer | null> {
    try {
      const dealer = await DealerModel.findByPk(id);

      if (!dealer) {
        return null;
      }

      return new Dealer(dealer.id, dealer.name, dealer.address);
    } catch (error) {
      if (error instanceof SequelizeError) {
        return null;
      }

      throw error;
    }
  }
}
