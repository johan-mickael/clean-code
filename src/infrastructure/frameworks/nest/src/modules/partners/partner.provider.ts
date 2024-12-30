import CreatePartnerCommandHandler from '@triumph/application/commands/partners/create-partner/create-partner.command-handler';
import CreatePartnerUseCase from '@triumph/application/commands/partners/create-partner/create-partner.usecase';
import DeletePartnerCommandHandler from '@triumph/application/commands/partners/delete-partner/delete-partner.command-handler';
import DeletePartnerUseCase from '@triumph/application/commands/partners/delete-partner/delete-partner.usecase';
import UpdatePartnerCommandHandler from '@triumph/application/commands/partners/update-partner/update-partner.command-handler';
import UpdatePartnerUseCase from '@triumph/application/commands/partners/update-partner/update-partner.usecase';
import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer.repository-reader';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/readers/partner.repository-reader';
import PartnerRepositoryWriter from '@triumph/application/ports/repositories/writers/partner.repository-writer';
import GetPartnerByIdentifierQueryHandler from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.query-handler';
import GetPartnerByIdentifierUseCase from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.usecase';
import ListPartnersQueryHandler from '@triumph/application/queries/partners/list-partners/list-partners.query-handler';
import ListPartnersUseCase from '@triumph/application/queries/partners/list-partners/list-partners.usecase';

export const ListPartnersUseCaseProvider = {
  provide: ListPartnersUseCase,
  useFactory: (partnerRepositoryReader: PartnerRepositoryReader) =>
    new ListPartnersQueryHandler(partnerRepositoryReader),
  inject: [PartnerRepositoryReader],
};

export const GetPartnerByIdentifierUseCaseProvider = {
  provide: GetPartnerByIdentifierUseCase,
  useFactory: (partnerRepositoryReader: PartnerRepositoryReader) =>
    new GetPartnerByIdentifierQueryHandler(partnerRepositoryReader),
  inject: [PartnerRepositoryReader],
};

export const CreatePartnerUseCaseProvider = {
  provide: CreatePartnerUseCase,
  useFactory: (partnerRepositoryWriter: PartnerRepositoryWriter, dealerRepositoryReader: DealerRepositoryReader) =>
    new CreatePartnerCommandHandler(partnerRepositoryWriter, dealerRepositoryReader),
  inject: [PartnerRepositoryWriter, DealerRepositoryReader],
};

export const UpdatePartnerUseCaseProvider = {
  provide: UpdatePartnerUseCase,
  useFactory: (partnerRepositoryWriter: PartnerRepositoryWriter, dealerRepositoryReader: DealerRepositoryReader) =>
    new UpdatePartnerCommandHandler(partnerRepositoryWriter, dealerRepositoryReader),
  inject: [PartnerRepositoryWriter, DealerRepositoryReader],
};

export const DeletePartnerUseCaseProvider = {
  provide: DeletePartnerUseCase,
  useFactory: (partnerRepositoryWriter: PartnerRepositoryWriter) =>
    new DeletePartnerCommandHandler(partnerRepositoryWriter),
  inject: [PartnerRepositoryWriter],
};
