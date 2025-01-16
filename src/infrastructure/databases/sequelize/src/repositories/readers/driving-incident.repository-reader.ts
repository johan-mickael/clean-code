import { Error as SequelizeError } from 'sequelize';

import DrivingIncidentRepositoryReader from '@triumph/application/ports/repositories/readers/driving-incident-repository-reader';
import DrivingIncident from '@triumph/domain/entity/driving-incident';

import DrivingIncidentModel from '../../models/driving-incident.model';

export default class SequelizeDrivingIncidentRepository implements DrivingIncidentRepositoryReader {
  async list(): Promise<DrivingIncident[]> {
    const incidents = await DrivingIncidentModel.findAll();

    return incidents.map(
      (incident) => new DrivingIncident(incident.id, incident.drivingHistoryId, incident.label, incident.comments),
    );
  }

  async getById(id: string): Promise<DrivingIncident | null> {
    try {
      const incident = await DrivingIncidentModel.findByPk(id);

      if (!incident) {
        return null;
      }

      return new DrivingIncident(incident.id, incident.drivingHistoryId, incident.label, incident.comments);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
