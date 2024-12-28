import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found-error';
import PartnerDTO from '../../../interfaces/dtos/partner-dto';
import PartnerDTOMapper from '../../../interfaces/mappers/partner-dto-mapper';
import PartnerRepositoryReader from '../../../ports/repositories/partner-repository-reader';
import GetPartnerByIdentifierQuery from './get-partner-by-identifier-query';
import GetPartnerByIdentifierQueryValidator from './get-partner-by-identifier-query-validator';

export default class GetPartnerByIdentifierQueryHandler {
  constructor(private readonly partnerRepository: PartnerRepositoryReader) {}

  /**
   * @throws {
   *  InvalidQueryError,
   *  PartnerNotFoundError,
   * }
   */
  async execute(getPartnerByIdentifierQuery: GetPartnerByIdentifierQuery): Promise<PartnerDTO> {
    new GetPartnerByIdentifierQueryValidator().validateQuery(getPartnerByIdentifierQuery);

    const partnerIdInput = getPartnerByIdentifierQuery.id.trim();
    const foundPartner = await this.partnerRepository.getById(partnerIdInput);

    if (foundPartner !== null) {
      return PartnerDTOMapper.toDTO(foundPartner);
    }

    throw new PartnerNotFoundError();
  }
}
