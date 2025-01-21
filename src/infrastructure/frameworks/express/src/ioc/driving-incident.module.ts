import { AwilixContainer, asClass, asFunction } from 'awilix';

import CreateDrivingIncidentCommandHandler from '@triumph/application/commands/driving-incidents/create-driving-incident/create-driving-incident.command-handler';
import DeleteDrivingIncidentCommandHandler from '@triumph/application/commands/driving-incidents/delete-driving-incident/delete-driving-incident.command-handler';
import UpdateDrivingIncidentCommandHandler from '@triumph/application/commands/driving-incidents/update-driving-incident/update-driving-incident.command-handler';
import GetDrivingIncidentByIdQueryHandler from '@triumph/application/queries/driving-incidents/get-driving-incident-by-identifier/get-driving-incident-by-identifier.query-handler';
import ListDrivingIncidentsQueryHandler from '@triumph/application/queries/driving-incidents/list-driving-incidents/list-driving-incidents.query-handler';
import SequelizeDrivingIncidentRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/driving-incident.repository-reader';
import SequelizeDrivingIncidentRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/driving-incident.repository-writer';

import DrivingIncidentController from '../controllers/driving-incident.controller';
import DrivingIncidentRoute from '../routes/driving-incident-route';

const registerDrivingIncidentModule = (container: AwilixContainer) => {
  // Register repositories
  container.register({
    drivingIncidentRepositoryReader: asClass(SequelizeDrivingIncidentRepositoryReader).classic(),
    drivingIncidentRepositoryWriter: asClass(SequelizeDrivingIncidentRepositoryWriter).classic(),
  });

  // Register use cases
  container.register({
    listDrivingIncidentsUseCase: asFunction(() => {
      return new ListDrivingIncidentsQueryHandler(container.resolve('drivingIncidentRepositoryReader'));
    }).singleton(),
    getDrivingIncidentByIdUseCase: asFunction(() => {
      return new GetDrivingIncidentByIdQueryHandler(container.resolve('drivingIncidentRepositoryReader'));
    }).singleton(),
    createDrivingIncidentUseCase: asFunction(() => {
      return new CreateDrivingIncidentCommandHandler(container.resolve('drivingIncidentRepositoryWriter'));
    }).singleton(),
    updateDrivingIncidentUseCase: asFunction(() => {
      return new UpdateDrivingIncidentCommandHandler(container.resolve('drivingIncidentRepositoryWriter'));
    }).singleton(),
    deleteDrivingIncidentUseCase: asFunction(() => {
      return new DeleteDrivingIncidentCommandHandler(container.resolve('drivingIncidentRepositoryWriter'));
    }).singleton(),
  });

  container.register({
    drivingIncidentController: asClass(DrivingIncidentController).classic(),
  });

  // Register routes
  container.register({
    drivingIncidentRoute: asClass(DrivingIncidentRoute).classic(),
  });
};

export default registerDrivingIncidentModule;
