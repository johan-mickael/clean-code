import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import SparePartDTOMapper from '../../../interfaces/mappers/spare-part.dto-mapper';
import SparePartRepositoryWriter from '../../../ports/repositories/writers/spare-part-repository-writer';
import CreateSparePartCommand from './create-spare-part.command';

export default class CreateSparePartCommandHandler {
  constructor(private readonly sparePartRepositoryWriter: SparePartRepositoryWriter) {}

  async execute(createSparePartCommand: CreateSparePartCommand): Promise<SparePartDTO> {
    const { name, price, quantity } = createSparePartCommand.sparePartPayload;

    const sparePartDTO = new SparePartDTO(null, name, price, quantity);
    const createdSparePart = await this.sparePartRepositoryWriter.create(sparePartDTO);

    return SparePartDTOMapper.toDTO(createdSparePart);
  }
}
