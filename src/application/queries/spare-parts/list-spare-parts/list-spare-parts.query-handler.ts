import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import SparePartDTOMapper from '../../../interfaces/mappers/spare-part.dto-mapper';
import SparePartRepositoryReader from '../../../ports/repositories/readers/spare-part-repository-reader';
import ListSparePartsQuery from './list-spare-parts.query';

export default class ListSparePartsQueryHandler {
  constructor(private readonly sparePartRepositoryReader: SparePartRepositoryReader) {}

  async execute(listSparePartsQuery: ListSparePartsQuery): Promise<SparePartDTO[]> {
    const spareParts = await this.sparePartRepositoryReader.list();

    return spareParts.map(SparePartDTOMapper.toDTO);
  }
}
