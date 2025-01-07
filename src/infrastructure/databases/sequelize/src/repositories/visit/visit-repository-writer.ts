import VisitRepositoryWriter from '@triumph/application/ports/repositories/writer/visit-repository-writer';
import { Visit } from '@triumph/domain/entity/visit';

import { toDomainBike } from '../../../../../adapters/bike-adapter';
import BikeModel from '../../models/bike.model';
import VisitModel from '../../models/visit.model';

export default class SequelizeVisitRepositoryWriter implements VisitRepositoryWriter {
  async add(visit: Visit): Promise<Visit> {
    const bikeData = await BikeModel.findByPk(visit.bike.id, { include: ['customer'] });
    if (!bikeData) {
      throw new Error('Bike not found');
    }

    const bike = toDomainBike(bikeData);

    const visitModel = await VisitModel.create({
      bikeId: bike.id,
      visitDate: visit.visitDate,
      price: visit.price,
      recapitulation: visit.recapitulation,
    });

    return new Visit(visitModel.id, bike, visitModel.visitDate, visitModel.price, visitModel.recapitulation);
  }
}
