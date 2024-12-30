import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found.error';

import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import PartnerDTOMapper from '../../../interfaces/mappers/partner.dto-mapper';
import PartnerRepositoryReader from '../../../ports/repositories/readers/partner.repository-reader';
import GetPartnerByIdentifierQuery from './get-partner-by-identifier.query';
import GetPartnerByIdentifierQueryValidator from './get-partner-by-identifier.query-validator';
import GetPartnerByIdentifierUseCase from './get-partner-by-identifier.usecase';

export default class GetPartnerByIdentifierQueryHandler implements GetPartnerByIdentifierUseCase {
  constructor(private readonly partnerRepository: PartnerRepositoryReader) {}

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
