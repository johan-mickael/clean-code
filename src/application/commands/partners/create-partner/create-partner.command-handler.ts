import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found.error';

import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import DealerRepositoryReader from '../../../ports/repositories/readers/dealer.repository-reader';
import PartnerRepositoryWriter from '../../../ports/repositories/writers/partner.repository-writer';
import CreatePartnerCommand from './create-partner.command';
import CreatePartnerCommandValidator from './create-partner.command-validator';
import CreatePartnerUseCase from './create-partner.usecase';

export default class CreatePartnerCommandHandler implements CreatePartnerUseCase {
  constructor(
    private readonly partnerRepositoryWriter: PartnerRepositoryWriter,
    private readonly dealerRepositoryReader: DealerRepositoryReader,
  ) {}

  async execute(createPartnerCommand: CreatePartnerCommand): Promise<PartnerDTO> {
    new CreatePartnerCommandValidator().validateCommand(createPartnerCommand);

    const partnerNameInput = createPartnerCommand.partnerPayload.name.trim();
    const partnerEmailInput = createPartnerCommand.partnerPayload.email.trim();
    const partnerDealerIdInput = createPartnerCommand.partnerPayload.dealerId.trim();

    const associatedDealer = await this.dealerRepositoryReader.getById(createPartnerCommand.partnerPayload.dealerId);
    if (!associatedDealer) {
      throw new DealerNotFoundError();
    }

    const partnerDTO = new PartnerDTO(null, partnerNameInput, partnerEmailInput, partnerDealerIdInput);

    return await this.partnerRepositoryWriter.create(partnerDTO);
  }
}
