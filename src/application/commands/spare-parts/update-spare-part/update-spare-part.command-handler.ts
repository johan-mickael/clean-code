import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import SparePartDTOMapper from '../../../interfaces/mappers/spare-part.dto-mapper';
import SparePartRepositoryWriter from '../../../ports/repositories/writers/spare-part-repository-writer';
import UpdateSparePartCommand from './update-spare-part.command';

export default class UpdateSparePartCommandHandler {
  constructor(private readonly sparePartRepositoryWriter: SparePartRepositoryWriter) {}

  async execute(updateSparePartCommand: UpdateSparePartCommand): Promise<SparePartDTO> {
    const { sparePartId, sparePartPayload } = updateSparePartCommand;
    const { name, price, quantity } = sparePartPayload;

    const sparePartDTO = new SparePartDTO(sparePartId, name, price, quantity);
    const updatedSparePart = await this.sparePartRepositoryWriter.update(sparePartId, sparePartDTO);

    return SparePartDTOMapper.toDTO(updatedSparePart);
  }
}
