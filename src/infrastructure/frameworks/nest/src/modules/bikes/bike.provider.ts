import CreateBikeCommandHandler from '@triumph/application/commands/bikes/create-bike/create-bike.command-handler';
import CreateBikeUseCase from '@triumph/application/commands/bikes/create-bike/create-bike.usecase';
import DeleteBikeCommandHandler from '@triumph/application/commands/bikes/delete-bike/delete-bike.command-handler';
import DeleteBikeUseCase from '@triumph/application/commands/bikes/delete-bike/delete-bike.usecase';
import UpdateBikeCommandHandler from '@triumph/application/commands/bikes/update-bike/update-bike.command-handler';
import UpdateBikeUseCase from '@triumph/application/commands/bikes/update-bike/update-bike.usecase';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/readers/bike-model.repository-reader';
import BikeRepositoryReader from '@triumph/application/ports/repositories/readers/bike-repository-reader';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/readers/partner.repository-reader';
import BikeRepositoryWriter from '@triumph/application/ports/repositories/writers/bike-repository-writer';
import GetBikeByIdentifierQueryHandler from '@triumph/application/queries/bikes/get-bike-by-identifier/get-bike-by-identifier.query-handler';
import GetBikeByIdentifierUseCase from '@triumph/application/queries/bikes/get-bike-by-identifier/get-bike-by-identifier.usecase';
import ListBikesQueryHandler from '@triumph/application/queries/bikes/list-bikes/list-bikes.query-handler';
import ListBikesUseCase from '@triumph/application/queries/bikes/list-bikes/list-bikes.usecase';

export const ListBikesUseCaseProvider = {
  provide: ListBikesUseCase,
  useFactory: (bikeRepositoryReader: BikeRepositoryReader) => new ListBikesQueryHandler(bikeRepositoryReader),
  inject: [BikeRepositoryReader],
};

export const GetBikeByIdentifierUseCaseProvider = {
  provide: GetBikeByIdentifierUseCase,
  useFactory: (bikeRepositoryReader: BikeRepositoryReader) => new GetBikeByIdentifierQueryHandler(bikeRepositoryReader),
  inject: [BikeRepositoryReader],
};

export const CreateBikeUseCaseProvider = {
  provide: CreateBikeUseCase,
  useFactory: (
    bikeRepositoryWriter: BikeRepositoryWriter,
    bikeModelRepositoryReader: BikeModelRepositoryReader,
    partnerRepositoryReader: PartnerRepositoryReader,
  ) => new CreateBikeCommandHandler(bikeRepositoryWriter, bikeModelRepositoryReader, partnerRepositoryReader),
  inject: [BikeRepositoryWriter, BikeModelRepositoryReader, PartnerRepositoryReader],
};

export const UpdateBikeUseCaseProvider = {
  provide: UpdateBikeUseCase,
  useFactory: (
    bikeRepositoryWriter: BikeRepositoryWriter,
    bikeModelRepositoryReader: BikeModelRepositoryReader,
    partnerRepositoryReader: PartnerRepositoryReader,
  ) => new UpdateBikeCommandHandler(bikeRepositoryWriter, bikeModelRepositoryReader, partnerRepositoryReader),
  inject: [BikeRepositoryWriter, BikeModelRepositoryReader, PartnerRepositoryReader],
};

export const DeleteBikeUseCaseProvider = {
  provide: DeleteBikeUseCase,
  useFactory: (bikeRepositoryWriter: BikeRepositoryWriter) => new DeleteBikeCommandHandler(bikeRepositoryWriter),
  inject: [BikeRepositoryWriter],
};
