import { Module } from '@nestjs/common';
import SequelizeDrivingLicenseRepositoryReader from '@triumph/sequelize-adapter/src/repositories/driving-license/driving-license-repository-reader';
import SequelizeDrivingLicenseRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/driving-license/driving-license-repository-writer';

import { DrivingLicenseController } from '../../controllers/driving_license/driving-license-controller';
import { DrivingLicenseWriterController } from '../../controllers/driving_license/driving-license-controller-writer';
import { DrivingLicenseService } from '../../modules/driving_license/driving-license-services';

@Module({
  imports: [],
  controllers: [DrivingLicenseController, DrivingLicenseWriterController],
  providers: [
    DrivingLicenseService,
    {
      provide: 'DrivingLicenseRepositoryReader',
      useClass: SequelizeDrivingLicenseRepositoryReader,
    },
    {
      provide: 'DrivingLicenseRepositoryWriter',
      useClass: SequelizeDrivingLicenseRepositoryWriter,
    },
  ],
})
export class DrivingLicenseModule {}
