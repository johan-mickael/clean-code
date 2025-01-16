import CreateSparePartCommandHandler from '@triumph/application/commands/spare-parts/create-spare-part/create-spare-part.command-handler';
import CreateSparePartUseCase from '@triumph/application/commands/spare-parts/create-spare-part/create-spare-part.usecase';
import UpdateSparePartCommandHandler from '@triumph/application/commands/spare-parts/update-spare-part/update-spare-part.command-handler';
import UpdateSparePartUseCase from '@triumph/application/commands/spare-parts/update-spare-part/update-spare-part.usecase';
import DeleteSparePartCommandHandler from '@triumph/application/commands/spare-parts/delete-spare-part/delete-spare-part.command-handler';
import DeleteSparePartUseCase from '@triumph/application/commands/spare-parts/delete-spare-part/delete-spare-part.usecase';
import SparePartRepositoryReader from '@triumph/application/ports/repositories/readers/spare-part-repository-reader';
import SparePartRepositoryWriter from '@triumph/application/ports/repositories/writers/spare-part-repository-writer';
import GetSparePartByIdentifierQueryHandler from '@triumph/application/queries/spare-parts/get-spare-part-by-identifier/get-spare-part-by-identifier.query-handler';
import GetSparePartByIdentifierUseCase from '@triumph/application/queries/spare-parts/get-spare-part-by-identifier/get-spare-part-by-identifier.usecase';
import ListSparePartsQueryHandler from '@triumph/application/queries/spare-parts/list-spare-parts/list-spare-parts.query-handler';
import ListSparePartsUseCase from '@triumph/application/queries/spare-parts/list-spare-parts/list-spare-parts.usecase';

export const ListSparePartsUseCaseProvider = {
  provide: ListSparePartsUseCase,
  useFactory: (sparePartRepositoryReader: SparePartRepositoryReader) =>
    new ListSparePartsQueryHandler(sparePartRepositoryReader),
  inject: [SparePartRepositoryReader],
};

export const GetSparePartByIdentifierUseCaseProvider = {
  provide: GetSparePartByIdentifierUseCase,
  useFactory: (sparePartRepositoryReader: SparePartRepositoryReader) =>
    new GetSparePartByIdentifierQueryHandler(sparePartRepositoryReader),
  inject: [SparePartRepositoryReader],
};

export const CreateSparePartUseCaseProvider = {
  provide: CreateSparePartUseCase,
  useFactory: (sparePartRepositoryWriter: SparePartRepositoryWriter) =>
    new CreateSparePartCommandHandler(sparePartRepositoryWriter),
  inject: [SparePartRepositoryWriter],
};

export const UpdateSparePartUseCaseProvider = {
  provide: UpdateSparePartUseCase,
  useFactory: (sparePartRepositoryWriter: SparePartRepositoryWriter) =>
    new UpdateSparePartCommandHandler(sparePartRepositoryWriter),
  inject: [SparePartRepositoryWriter],
};

export const DeleteSparePartUseCaseProvider = {
  provide: DeleteSparePartUseCase,
  useFactory: (sparePartRepositoryWriter: SparePartRepositoryWriter) =>
    new DeleteSparePartCommandHandler(sparePartRepositoryWriter),
  inject: [SparePartRepositoryWriter],
};
