import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found-error';
import DealerDTO from '../../../interfaces/dtos/dealer-dto';
import DealerDTOMapper from '../../../interfaces/mappers/dealer-dto-mapper';
import DealerRepositoryReader from '../../../ports/repositories/dealer-repository-reader';
import GetDealerByIdentifierQuery from './get-dealer-by-identifier-query';
import GetDealerByIdentifierQueryValidator from './get-dealer-by-identifier-query-validator';

export default class GetDealerByIdentifierQueryHandler {
  constructor(private readonly dealerRepository: DealerRepositoryReader) {}

  /**
   * @throws {
   *  InvalidQueryError,
   *  DealerNotFoundError,
   * }
   */
  async execute(getDealerByIdentifierQuery: GetDealerByIdentifierQuery): Promise<DealerDTO> {
    new GetDealerByIdentifierQueryValidator().validateQuery(getDealerByIdentifierQuery);

    const dealerIdInput = getDealerByIdentifierQuery.id.trim();
    const foundDealer = await this.dealerRepository.getById(dealerIdInput);

    if (foundDealer !== null) {
      return DealerDTOMapper.toDTO(foundDealer);
    }

    throw new DealerNotFoundError();
  }
}
