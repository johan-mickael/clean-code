import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import BikeModelDTOMapper from '../../../interfaces/mappers/bike-model.dto-mapper';
import BikeModelRepositoryReader from '../../../ports/repositories/readers/bike-model.repository-reader';
import ListBikeModelsQuery from './list-bike-models.query';

export default class ListBikeModelsQueryHandler {
  constructor(private readonly bikeModelRepositoryReader: BikeModelRepositoryReader) {}

  async execute(query: ListBikeModelsQuery): Promise<BikeModelDTO[]> {
    const bikeModels = await this.bikeModelRepositoryReader.list();

    return bikeModels.map(BikeModelDTOMapper.toDTO);
  }
}
