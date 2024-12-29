import DealerRepositoryReader from '@triumph/application/ports/repositories/dealer-repository-reader';
import { Dealer } from '@triumph/domain/entity/dealer';

import DealerModel from '../models/dealer.model';
import ObjectIdValidator from '../validators/objectid-validator';

export default class MongooseDealerRepository implements DealerRepositoryReader {
  async list(): Promise<Dealer[]> {
    const dealers = await DealerModel.find({});

    return dealers.map((dealer) => new Dealer(dealer.id, dealer.name, dealer.address));
  }

  async getById(id: string): Promise<Dealer | null> {
    if (!ObjectIdValidator.isValid(id)) {
      return null;
    }

    const dealer = await DealerModel.findById(id);

    if (!dealer) {
      return null;
    }

    return new Dealer(dealer.id, dealer.name, dealer.address);
  }
}
