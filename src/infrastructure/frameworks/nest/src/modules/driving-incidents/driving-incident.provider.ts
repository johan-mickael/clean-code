import CreateDrivingIncidentCommandHandler from '@triumph/application/commands/driving-incidents/create-driving-incident/create-driving-incident.command-handler';
import CreateDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/create-driving-incident/create-driving-incident.usecase';
import UpdateDrivingIncidentCommandHandler from '@triumph/application/commands/driving-incidents/update-driving-incident/update-driving-incident.command-handler';
import UpdateDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/update-driving-incident/update-driving-incident.usecase';
import DeleteDrivingIncidentCommandHandler from '@triumph/application/commands/driving-incidents/delete-driving-incident/delete-driving-incident.command-handler';
import DeleteDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/delete-driving-incident/delete-driving-incident.usecase';
import DrivingIncidentRepositoryReader from '@triumph/application/ports/repositories/readers/driving-incident-repository-reader';
import DrivingIncidentRepositoryWriter from '@triumph/application/ports/repositories/writers/driving-incident-repository-writer';
import GetDrivingIncidentByIdentifierQueryHandler from '@triumph/application/queries/driving-incidents/get-driving-incident-by-identifier/get-driving-incident-by-identifier.query-handler';
import GetDrivingIncidentByIdentifierUseCase from '@triumph/application/queries/driving-incidents/get-driving-incident-by-identifier/get-driving-incident-by-identifier.usecase';
import ListDrivingIncidentsQueryHandler from '@triumph/application/queries/driving-incidents/list-driving-incidents/list-driving-incidents.query-handler';
import ListDrivingIncidentsUseCase from '@triumph/application/queries/driving-incidents/list-driving-incidents/list-driving-incidents.usecase';

export const ListDrivingIncidentsUseCaseProvider = {
  provide: ListDrivingIncidentsUseCase,
  useFactory: (drivingIncidentRepositoryReader: DrivingIncidentRepositoryReader) => new ListDrivingIncidentsQueryHandler(drivingIncidentRepositoryReader),
  inject: [DrivingIncidentRepositoryReader],
};

export const GetDrivingIncidentByIdentifierUseCaseProvider = {
  provide: GetDrivingIncidentByIdentifierUseCase,
  useFactory: (drivingIncidentRepositoryReader: DrivingIncidentRepositoryReader) => new GetDrivingIncidentByIdentifierQueryHandler(drivingIncidentRepositoryReader),
  inject: [DrivingIncidentRepositoryReader],
};

export const CreateDrivingIncidentUseCaseProvider = {
  provide: CreateDrivingIncidentUseCase,
  useFactory: (drivingIncidentRepositoryWriter: DrivingIncidentRepositoryWriter) => new CreateDrivingIncidentCommandHandler(drivingIncidentRepositoryWriter),
  inject: [DrivingIncidentRepositoryWriter],
};

export const UpdateDrivingIncidentUseCaseProvider = {
  provide: UpdateDrivingIncidentUseCase,
  useFactory: (drivingIncidentRepositoryWriter: DrivingIncidentRepositoryWriter) => new UpdateDrivingIncidentCommandHandler(drivingIncidentRepositoryWriter),
  inject: [DrivingIncidentRepositoryWriter],
};

export const DeleteDrivingIncidentUseCaseProvider = {
  provide: DeleteDrivingIncidentUseCase,
  useFactory: (drivingIncidentRepositoryWriter: DrivingIncidentRepositoryWriter) => new DeleteDrivingIncidentCommandHandler(drivingIncidentRepositoryWriter),
  inject: [DrivingIncidentRepositoryWriter],
};
