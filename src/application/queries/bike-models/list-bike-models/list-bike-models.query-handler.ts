import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import BikeModelDTOMapper from '../../../interfaces/mappers/bike-model.dto-mapper';
import BikeModelRepositoryReader from '../../../ports/repositories/readers/bike-model.repository-reader';
import ListBikeModelsQuery from './list-bike-models.query';
import ListBikeModelsUseCase from './list-bike-models.usecase';

export default class ListBikeModelsQueryHandler implements ListBikeModelsUseCase {
  constructor(private readonly bikeModelRepositoryReader: BikeModelRepositoryReader) {}

  async execute(query: ListBikeModelsQuery): Promise<BikeModelDTO[]> {
    const bikeModels = await this.bikeModelRepositoryReader.list();

    return bikeModels.map(BikeModelDTOMapper.toDTO);
  }
}
