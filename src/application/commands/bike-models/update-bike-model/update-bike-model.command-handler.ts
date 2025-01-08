import Bike from '@triumph/domain/entity/bike';

import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import BikeModelDTOMapper from '../../../interfaces/mappers/bike-model.dto-mapper';
import BikeModelRepositoryWriter from '../../../ports/repositories/writers/bike-model.repository-writer';
import UpdateBikeModelCommand from './update-bike-model.command';
import UpdateBikeModelCommandValidator from './update-bike-model.command-validator';
import UpdateBikeModelUseCase from './update-bike-model.usecase';

export default class UpdateBikeModelCommandHandler implements UpdateBikeModelUseCase {
  constructor(private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter) {}

  async execute(updateBikeModelCommand: UpdateBikeModelCommand): Promise<BikeModelDTO> {
    new UpdateBikeModelCommandValidator().validateCommand(updateBikeModelCommand);

    const bikeModelNameInput = updateBikeModelCommand.bikeModelData.name.trim();
    const bikeModelDTO = new BikeModelDTO(null, bikeModelNameInput);

    const updatedBikeModelEntity = await this.bikeModelRepositoryWriter.update(
      updateBikeModelCommand.bikeModelId,
      bikeModelDTO,
    );
    return BikeModelDTOMapper.toDTO(updatedBikeModelEntity);
  }
}
