import { SparePartNotFoundError } from '@triumph/domain/errors/spare-parts/spare-part-not-found.error';

import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import SparePartDTOMapper from '../../../interfaces/mappers/spare-part.dto-mapper';
import SparePartRepositoryReader from '../../../ports/repositories/readers/spare-part-repository-reader';
import GetSparePartByIdQuery from './get-spare-part-by-identifier.query';

export default class GetSparePartByIdQueryHandler {
  constructor(private readonly sparePartRepository: SparePartRepositoryReader) {}

  async execute(getSparePartByIdQuery: GetSparePartByIdQuery): Promise<SparePartDTO> {
    const sparePartIdInput = getSparePartByIdQuery.id;
    const foundSparePart = await this.sparePartRepository.getById(sparePartIdInput);

    if (foundSparePart !== null) {
      return SparePartDTOMapper.toDTO(foundSparePart);
    }

    throw new SparePartNotFoundError();
  }
}
