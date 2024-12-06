import { Module } from '@nestjs/common';
import CustomerController from '../controllers/customer-controller';
import CustomerRepositoryReader from '../../../../../application/ports/repositories/customer-repository-reader';
import InMemoryCustomerRepository from '../../../../adapters/in-memory-database/customer-repository-reader';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    {
      provide: CustomerRepositoryReader,
      useClass: InMemoryCustomerRepository,
    },
  ],
})
export class CustomerModule {}
