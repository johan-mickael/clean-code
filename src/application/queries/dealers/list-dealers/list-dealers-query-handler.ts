import DealerDTO from '../../../interfaces/dtos/dealer-dto';
import DealerDTOMapper from '../../../interfaces/mappers/dealer-dto-mapper';
import DealerRepositoryReader from '../../../ports/repositories/dealer-repository-reader';
import ListDealersQuery from './list-dealers-query';

export default class ListDealersQueryHandler {
  constructor(private readonly dealerRepositoryReader: DealerRepositoryReader) {}

  async execute(query: ListDealersQuery): Promise<DealerDTO[]> {
    const dealers = await this.dealerRepositoryReader.list();

    return dealers.map(DealerDTOMapper.toDTO);
  }
}
