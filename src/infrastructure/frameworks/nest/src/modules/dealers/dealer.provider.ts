import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer.repository-reader';
import GetDealerByIdentifierQueryHandler from '@triumph/application/queries/dealers/get-dealer-by-identifier/get-dealer-by-identifier.query-handler';
import GetDealerByIdentifierUseCase from '@triumph/application/queries/dealers/get-dealer-by-identifier/get-dealer-by-identifier.usecase';
import ListDealersQueryHandler from '@triumph/application/queries/dealers/list-dealers/list-dealers.query-handler';
import ListDealersUseCase from '@triumph/application/queries/dealers/list-dealers/list-dealers.usecase';

export const ListDealersUseCaseProvider = {
  provide: ListDealersUseCase,
  useFactory: (dealerRepositoryReader: DealerRepositoryReader) => new ListDealersQueryHandler(dealerRepositoryReader),
  inject: [DealerRepositoryReader],
};

export const GetDealerByIdentifierUseCaseProvider = {
  provide: GetDealerByIdentifierUseCase,
  useFactory: (dealerRepositoryReader: DealerRepositoryReader) =>
    new GetDealerByIdentifierQueryHandler(dealerRepositoryReader),
  inject: [DealerRepositoryReader],
};
