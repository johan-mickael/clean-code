import { Module } from '@nestjs/common';
import CreateCustomerCommandHandler from '@triumph/application/queries/customer/add/create-customer-handler';
import SearchCustomerQueryHandler from '@triumph/application/queries/customer/filter/search-customer-query-handler';
import GetCustomerListQueryHandler from '@triumph/application/queries/customer/get/get-customer-list-query-handler';
import GetCustomerQueryHandler from '@triumph/application/queries/customer/get/get-customer-query-handler';
import SequelizeCustomerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-reader';
import SequelizeCustomerRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-writer';
import SequelizeDrivingLicenseRepositoryReader from '@triumph/sequelize-adapter/src/repositories/driving-license/driving-license-repository-reader';
import SequelizeOccupationRepositoryReader from '@triumph/sequelize-adapter/src/repositories/occupation/occupation-repository-reader';

import { CustomerReaderController } from '../../controllers/customer/customer-controller';
import { CustomerWriterController } from '../../controllers/customer/customer-controller-writer';
import CustomerService from '../../modules/customer/customer-services';

@Module({
  controllers: [CustomerReaderController, CustomerWriterController],
  providers: [
    {
      provide: 'CustomerRepositoryWriter',
      useClass: SequelizeCustomerRepositoryWriter,
    },
    {
      provide: 'CustomerRepositoryReader',
      useClass: SequelizeCustomerRepositoryReader,
    },
    {
      provide: 'DrivingLicenseRepositoryReader',
      useClass: SequelizeDrivingLicenseRepositoryReader,
    },
    {
      provide: 'OccupationRepositoryReader',
      useClass: SequelizeOccupationRepositoryReader,
    },
    GetCustomerListQueryHandler,
    GetCustomerQueryHandler,
    SearchCustomerQueryHandler,
    CreateCustomerCommandHandler,
    CustomerService,
  ],
})
export class CustomerModule {}
