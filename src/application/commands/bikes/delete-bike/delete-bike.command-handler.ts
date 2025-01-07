import BikeRepositoryWriter from '../../../ports/repositories/writers/bike-repository-writer';
import DeleteBikeCommand from './delete-bike.command';
import DeleteBikeCommandValidator from './delete-bike.command-validator';
import DeleteBikeUseCase from './delete-bike.usecase';

export default class DeleteBikeCommandHandler implements DeleteBikeUseCase {
  constructor(private readonly bikeRepositoryWriter: BikeRepositoryWriter) {}

  async execute(deleteBikeCommand: DeleteBikeCommand): Promise<void> {
    new DeleteBikeCommandValidator().validateCommand(deleteBikeCommand);

    const bikeIdInput = deleteBikeCommand.bikeId;

    await this.bikeRepositoryWriter.delete(bikeIdInput);
  }
}
