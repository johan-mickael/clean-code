import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found.error';

import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import PartnerDTOMapper from '../../../interfaces/mappers/partner.dto-mapper';
import DealerRepositoryReader from '../../../ports/repositories/readers/dealer.repository-reader';
import PartnerRepositoryWriter from '../../../ports/repositories/writers/partner.repository-writer';
import UpdatePartnerCommand from './update-partner.command';
import UpdatePartnerCommandValidator from './update-partner.command-validator';
import UpdatePartnerUseCase from './update-partner.usecase';

export default class UpdatePartnerCommandHandler implements UpdatePartnerUseCase {
  constructor(
    private readonly partnerRepositoryWriter: PartnerRepositoryWriter,
    private readonly dealerRepositoryReader: DealerRepositoryReader,
  ) {}

  /**
   * @throws {
   *  InvalidCommandError,
   *  PartnerNotFoundError,
   *  DealerNotFoundError
   * }
   */
  async execute(updatePartnerCommand: UpdatePartnerCommand): Promise<PartnerDTO> {
    new UpdatePartnerCommandValidator().validateCommand(updatePartnerCommand);

    const {
      name: partnerNameInput,
      email: partnerEmailInput,
      dealerId: partnerDealerIdInput,
    } = updatePartnerCommand.partnerData;

    const partnerDTO = new PartnerDTO(
      null,
      partnerNameInput.trim(),
      partnerEmailInput.trim(),
      partnerDealerIdInput.trim(),
    );

    const associatedDealer = await this.dealerRepositoryReader.getById(partnerDTO.dealerId);
    if (!associatedDealer) {
      throw new DealerNotFoundError();
    }

    const updatedPartnerEntity = await this.partnerRepositoryWriter.update(updatePartnerCommand.partnerId, partnerDTO);
    return PartnerDTOMapper.toDTO(updatedPartnerEntity);
  }
}
