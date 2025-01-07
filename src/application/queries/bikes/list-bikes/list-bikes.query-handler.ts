import BikeDTO from '../../../interfaces/dtos/bike.dto';
import BikeDTOMapper from '../../../interfaces/mappers/bike.dto-mapper';
import BikeRepositoryReader from '../../../ports/repositories/readers/bike-repository-reader';
import ListBikesQuery from './list-bikes.query';
import ListBikesQueryValidator from './list-bikes.query-validator';
import ListBikesUseCase from './list-bikes.usecase';

export default class ListBikesQueryHandler implements ListBikesUseCase {
  constructor(private readonly bikeRepositoryReader: BikeRepositoryReader) {}

  async execute(listBikesQuery: ListBikesQuery): Promise<BikeDTO[]> {
    new ListBikesQueryValidator().validateQuery(listBikesQuery);

    const bikes = await this.bikeRepositoryReader.list();

    return bikes.map(BikeDTOMapper.toDTO);
  }
}
