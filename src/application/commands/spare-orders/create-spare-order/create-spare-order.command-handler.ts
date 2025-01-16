import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import SpareOrderDTOMapper from '../../../interfaces/mappers/spare-order.dto-mapper';
import SpareOrderRepositoryWriter from '../../../ports/repositories/writers/spare-order-repository-writer';
import CreateSpareOrderCommand from './create-spare-order.command';

export default class CreateSpareOrderCommandHandler {
  constructor(private readonly spareOrderRepositoryWriter: SpareOrderRepositoryWriter) {}

  async execute(createSpareOrderCommand: CreateSpareOrderCommand): Promise<SpareOrderDTO> {
    const { spareId, quantity, price, deliveryDelayDays } = createSpareOrderCommand.spareOrderPayload;

    const spareOrderDTO = new SpareOrderDTO(null, spareId, quantity, price, deliveryDelayDays);
    const createdSpareOrder = await this.spareOrderRepositoryWriter.create(spareOrderDTO);

    return SpareOrderDTOMapper.toDTO(createdSpareOrder);
  }
}
