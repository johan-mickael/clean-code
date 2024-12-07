import { Module } from '@nestjs/common';
import CustomerController from '../controllers/customer-controller';
import CustomerRepositoryReader from '@triumph/application/ports/repositories/customer-repository-reader';
import InMemoryCustomerRepository from '@triumph/in-memory-database-infrastructure/customer-repository-reader';

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
