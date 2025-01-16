import { Error as SequelizeError } from 'sequelize';

import DrivingIncidentDTO from '@triumph/application/interfaces/dtos/driving-incident.dto';
import DrivingIncidentDTOMapper from '@triumph/application/interfaces/mappers/driving-incident.dto-mapper';
import DrivingIncidentRepositoryWriter from '@triumph/application/ports/repositories/writers/driving-incident-repository-writer';
import DrivingIncident from '@triumph/domain/entity/driving-incident';
import { DrivingIncidentNotFoundError } from '@triumph/domain/errors/driving-incidents/driving-incident-not-found.error';

import DrivingIncidentModel from '../../models/driving-incident.model';

export default class SequelizeDrivingIncidentRepositoryWriter implements DrivingIncidentRepositoryWriter {
  async create(drivingIncidentDTO: DrivingIncidentDTO): Promise<DrivingIncident> {
    const incidentModel = await DrivingIncidentModel.create({
      drivingHistoryId: drivingIncidentDTO.drivingHistoryId,
      label: drivingIncidentDTO.label,
      comments: drivingIncidentDTO.comments,
    });

    return DrivingIncidentDTOMapper.toEntity(incidentModel);
  }

  async update(id: string, drivingIncidentDTO: DrivingIncidentDTO): Promise<DrivingIncident> {
    try {
      const [affectedIncidentCount, updatedIncidents] = await DrivingIncidentModel.update(
        {
          drivingHistoryId: drivingIncidentDTO.drivingHistoryId,
          label: drivingIncidentDTO.label,
          comments: drivingIncidentDTO.comments,
        },
        {
          where: { id },
          returning: true,
        },
      );

      if (affectedIncidentCount === 0) {
        throw new DrivingIncidentNotFoundError();
      }

      const updatedIncident = updatedIncidents[0];
      return DrivingIncidentDTOMapper.toEntity(updatedIncident);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new DrivingIncidentNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedIncidentCount = await DrivingIncidentModel.destroy({
        where: { id },
      });

      if (deletedIncidentCount === 0) {
        throw new DrivingIncidentNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new DrivingIncidentNotFoundError();
      }

      throw error;
    }
  }
}
