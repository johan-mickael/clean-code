import CreateSpareOrderCommandHandler from '@triumph/application/commands/spare-orders/create-spare-order/create-spare-order.command-handler';
import CreateSpareOrderUseCase from '@triumph/application/commands/spare-orders/create-spare-order/create-spare-order.usecase';
import DeleteSpareOrderCommandHandler from '@triumph/application/commands/spare-orders/delete-spare-order/delete-spare-order.command-handler';
import DeleteSpareOrderUseCase from '@triumph/application/commands/spare-orders/delete-spare-order/delete-spare-order.usecase';
import UpdateSpareOrderCommandHandler from '@triumph/application/commands/spare-orders/update-spare-order/update-spare-order.command-handler';
import UpdateSpareOrderUseCase from '@triumph/application/commands/spare-orders/update-spare-order/update-spare-order.usecase';
import SpareOrderRepositoryReader from '@triumph/application/ports/repositories/readers/spare-order-repository-reader';
import SpareOrderRepositoryWriter from '@triumph/application/ports/repositories/writers/spare-order-repository-writer';
import GetSpareOrderByIdentifierQueryHandler from '@triumph/application/queries/spare-orders/get-spare-order-by-identifier/get-spare-order-by-identifier.query-handler';
import GetSpareOrderByIdentifierUseCase from '@triumph/application/queries/spare-orders/get-spare-order-by-identifier/get-spare-order-by-identifier.usecase';
import ListSpareOrdersQueryHandler from '@triumph/application/queries/spare-orders/list-spare-orders/list-spare-orders.query-handler';
import ListSpareOrdersUseCase from '@triumph/application/queries/spare-orders/list-spare-orders/list-spare-orders.usecase';

export const ListSpareOrdersUseCaseProvider = {
  provide: ListSpareOrdersUseCase,
  useFactory: (spareOrderRepositoryReader: SpareOrderRepositoryReader) =>
    new ListSpareOrdersQueryHandler(spareOrderRepositoryReader),
  inject: [SpareOrderRepositoryReader],
};

export const GetSpareOrderByIdentifierUseCaseProvider = {
  provide: GetSpareOrderByIdentifierUseCase,
  useFactory: (spareOrderRepositoryReader: SpareOrderRepositoryReader) =>
    new GetSpareOrderByIdentifierQueryHandler(spareOrderRepositoryReader),
  inject: [SpareOrderRepositoryReader],
};

export const CreateSpareOrderUseCaseProvider = {
  provide: CreateSpareOrderUseCase,
  useFactory: (spareOrderRepositoryWriter: SpareOrderRepositoryWriter) =>
    new CreateSpareOrderCommandHandler(spareOrderRepositoryWriter),
  inject: [SpareOrderRepositoryWriter],
};

export const UpdateSpareOrderUseCaseProvider = {
  provide: UpdateSpareOrderUseCase,
  useFactory: (spareOrderRepositoryWriter: SpareOrderRepositoryWriter) =>
    new UpdateSpareOrderCommandHandler(spareOrderRepositoryWriter),
  inject: [SpareOrderRepositoryWriter],
};

export const DeleteSpareOrderUseCaseProvider = {
  provide: DeleteSpareOrderUseCase,
  useFactory: (spareOrderRepositoryWriter: SpareOrderRepositoryWriter) =>
    new DeleteSpareOrderCommandHandler(spareOrderRepositoryWriter),
  inject: [SpareOrderRepositoryWriter],
};
