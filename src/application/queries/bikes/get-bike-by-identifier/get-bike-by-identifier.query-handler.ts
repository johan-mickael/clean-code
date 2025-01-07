import { BikeNotFoundError } from '@triumph/domain/errors/bikes/bike-not-found.error';

import BikeDTO from '../../../interfaces/dtos/bike.dto';
import BikeDTOMapper from '../../../interfaces/mappers/bike.dto-mapper';
import BikeRepositoryReader from '../../../ports/repositories/readers/bike-repository-reader';
import GetBikeByIdentifierQuery from './get-bike-by-identifier.query';
import GetBikeByIdentifierQueryValidator from './get-bike-by-identifier.query-validator';
import GetBikeByIdentifierUseCase from './get-bike-by-identifier.usecase';

export default class GetBikeByIdentifierQueryHandler implements GetBikeByIdentifierUseCase {
  constructor(private readonly bikeRepository: BikeRepositoryReader) {}

  async execute(getBikeByIdentifierQuery: GetBikeByIdentifierQuery): Promise<BikeDTO> {
    new GetBikeByIdentifierQueryValidator().validateQuery(getBikeByIdentifierQuery);

    const bikeIdInput = getBikeByIdentifierQuery.id;
    const foundBike = await this.bikeRepository.getById(bikeIdInput);

    if (foundBike !== null) {
      return BikeDTOMapper.toDTO(foundBike);
    }

    throw new BikeNotFoundError();
  }
}
