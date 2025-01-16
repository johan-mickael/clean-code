import { Module } from '@nestjs/common';
import DriverLicenseRepositoryReader from '@triumph/application/ports/repositories/readers/driver-license-repository-reader';
import DriverLicenseRepositoryWriter from '@triumph/application/ports/repositories/writers/driver-license-repository-writer';
import SequelizeDriverLicenseRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/driver-license.repository-reader';
import SequelizeDriverLicenseRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/driver-license.repository-writer';

import DriverLicenseReaderController from '../../controllers/driver-licenses/driver-license.reader.controller';
import DriverLicenseWriterController from '../../controllers/driver-licenses/driver-license.writer.controller';
import {
  CreateDriverLicenseUseCaseProvider,
  UpdateDriverLicenseUseCaseProvider,
  DeleteDriverLicenseUseCaseProvider,
  GetDriverLicenseByIdentifierUseCaseProvider,
  ListDriverLicensesUseCaseProvider,
} from './driver-license.provider';

@Module({
  imports: [],
  controllers: [DriverLicenseReaderController, DriverLicenseWriterController],
  providers: [
    {
      provide: DriverLicenseRepositoryReader,
      useClass: SequelizeDriverLicenseRepositoryReader,
    },
    {
      provide: DriverLicenseRepositoryWriter,
      useClass: SequelizeDriverLicenseRepositoryWriter,
    },
    ListDriverLicensesUseCaseProvider,
    GetDriverLicenseByIdentifierUseCaseProvider,
    CreateDriverLicenseUseCaseProvider,
    UpdateDriverLicenseUseCaseProvider,
    DeleteDriverLicenseUseCaseProvider,
  ],
  exports: [],
})
export class DriverLicenseModule {}
