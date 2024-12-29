import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import PartnerDTOMapper from '../../../interfaces/mappers/partner.dto-mapper';
import PartnerRepositoryReader from '../../../ports/repositories/readers/partner.repository-reader';
import ListPartnersQuery from './list-partners.query';

export default class ListPartnersQueryHandler {
  constructor(private readonly partnerRepositoryReader: PartnerRepositoryReader) {}

  async execute(query: ListPartnersQuery): Promise<PartnerDTO[]> {
    const partners = await this.partnerRepositoryReader.list();

    return partners.map(PartnerDTOMapper.toDTO);
  }
}
