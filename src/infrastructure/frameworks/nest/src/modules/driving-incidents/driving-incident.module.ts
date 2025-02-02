import { Module } from '@nestjs/common';
import DrivingIncidentRepositoryReader from '@triumph/application/ports/repositories/readers/driving-incident-repository-reader';
import DrivingIncidentRepositoryWriter from '@triumph/application/ports/repositories/writers/driving-incident-repository-writer';
import SequelizeDrivingIncidentRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/driving-incident.repository-reader';
import SequelizeDrivingIncidentRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/driving-incident.repository-writer';

import DrivingIncidentReaderController from '../../controllers/driving-incident/driving-incident.reader.controller';
import DrivingIncidentWriterController from '../../controllers/driving-incident/driving-incident.writer.controller';
import {
  CreateDrivingIncidentUseCaseProvider,
  DeleteDrivingIncidentUseCaseProvider,
  GetDrivingIncidentByIdentifierUseCaseProvider,
  ListDrivingIncidentsUseCaseProvider,
  UpdateDrivingIncidentUseCaseProvider,
} from './driving-incident.provider';

@Module({
  imports: [],
  controllers: [DrivingIncidentReaderController, DrivingIncidentWriterController],
  providers: [
    {
      provide: DrivingIncidentRepositoryReader,
      useClass: SequelizeDrivingIncidentRepositoryReader,
    },
    {
      provide: DrivingIncidentRepositoryWriter,
      useClass: SequelizeDrivingIncidentRepositoryWriter,
    },
    ListDrivingIncidentsUseCaseProvider,
    GetDrivingIncidentByIdentifierUseCaseProvider,
    CreateDrivingIncidentUseCaseProvider,
    UpdateDrivingIncidentUseCaseProvider,
    DeleteDrivingIncidentUseCaseProvider,
  ],
  exports: [],
})
export class DrivingIncidentsModule {}
