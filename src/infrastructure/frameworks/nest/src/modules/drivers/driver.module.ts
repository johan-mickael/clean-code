import { Module } from '@nestjs/common';
import DriverRepositoryReader from '@triumph/application/ports/repositories/readers/driver-repository-reader';
import DriverRepositoryWriter from '@triumph/application/ports/repositories/writers/driver-repository-writer';
import SequelizeDriverRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/driver.repository-reader';
import SequelizeDriverRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/driver.repository-writer';

import DriversReaderController from '../../controllers/drivers/driver.reader.controller';
import DriversWriterController from '../../controllers/drivers/driver.writer.controller';
import {
  CreateDriverUseCaseProvider,
  DeleteDriverUseCaseProvider,
  GetDriverByIdentifierUseCaseProvider,
  ListDriversUseCaseProvider,
  UpdateDriverUseCaseProvider,
} from './driver.provider';

@Module({
  imports: [],
  controllers: [DriversReaderController, DriversWriterController],
  providers: [
    {
      provide: DriverRepositoryReader,
      useClass: SequelizeDriverRepositoryReader,
    },
    {
      provide: DriverRepositoryWriter,
      useClass: SequelizeDriverRepositoryWriter,
    },
    ListDriversUseCaseProvider,
    GetDriverByIdentifierUseCaseProvider,
    CreateDriverUseCaseProvider,
    UpdateDriverUseCaseProvider,
    DeleteDriverUseCaseProvider,
  ],
  exports: [],
})
export class DriversModule {}
