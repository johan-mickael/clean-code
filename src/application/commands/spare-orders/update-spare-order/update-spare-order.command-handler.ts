import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import SpareOrderDTOMapper from '../../../interfaces/mappers/spare-order.dto-mapper';
import SpareOrderRepositoryWriter from '../../../ports/repositories/writers/spare-order-repository-writer';
import UpdateSpareOrderCommand from './update-spare-order.command';

export default class UpdateSpareOrderCommandHandler {
  constructor(private readonly spareOrderRepositoryWriter: SpareOrderRepositoryWriter) {}

  async execute(updateSpareOrderCommand: UpdateSpareOrderCommand): Promise<SpareOrderDTO> {
    const { spareOrderId, spareOrderPayload } = updateSpareOrderCommand;
    const { spareId, quantity, price, deliveryDelayDays } = spareOrderPayload;

    const spareOrderDTO = new SpareOrderDTO(spareOrderId, spareId, quantity, price, deliveryDelayDays);
    const updatedSpareOrder = await this.spareOrderRepositoryWriter.update(spareOrderId, spareOrderDTO);

    return SpareOrderDTOMapper.toDTO(updatedSpareOrder);
  }
}
