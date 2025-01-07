import { Op } from 'sequelize';

import TrialRepositoryReader from '@triumph/application/ports/repositories/reader/trial-repository-reader';
import { Trial } from '@triumph/domain/entity/trial';

import { toDomainTrial } from '../../../../../adapters/trial-adapter';
import BikeModelModel from '../../models/bike-model.model';
import BikeModel from '../../models/bike.model';
import CustomerModel from '../../models/customer.model';
import DrivingLicenseModel from '../../models/driving-licence.model';
import TrialModel from '../../models/trial.model';

export default class SequelizeTrialRepositoryReader implements TrialRepositoryReader {
  async list(): Promise<Trial[]> {
    try {
      const trials = await TrialModel.findAll({
        include: [
          {
            model: BikeModel,
            as: 'bike',
            include: [
              {
                model: BikeModelModel,
                as: 'bikeModel',
              },
              {
                model: CustomerModel,
                as: 'customer',
                include: [
                  {
                    model: DrivingLicenseModel,
                    as: 'drivingLicense',
                  },
                ],
              },
            ],
          },
        ],
      });

      return trials
        .map((trial) => {
          const bike = trial.bike;
          if (!bike) {
            console.warn(`Trial with id ${trial.id} has no associated bike`);
            return null;
          }

          const customer = bike.partner;
          if (!customer) {
            console.warn(`Bike with id ${bike.id} has no associated customer`);
            return null;
          }

          return toDomainTrial(trial);
        })
        .filter((trial): trial is Trial => trial !== null);
    } catch (error) {
      console.error('Error retrieving trials:', error);
      throw new Error('Error retrieving trials: ' + error);
    }
  }

  async getById(trialId: number): Promise<Trial | null> {
    const trial = await TrialModel.findByPk(trialId, {
      include: ['bike'],
    });
    if (!trial) return null;

    return toDomainTrial(trial);
  }

  async search(keyword: string): Promise<Trial[]> {
    const trials = await TrialModel.findAll({
      where: {
        startDate: { [Op.iLike]: `%${keyword}%` },
      },
      include: ['bike'],
    });

    return trials.map((trial) => toDomainTrial(trial));
  }
}
