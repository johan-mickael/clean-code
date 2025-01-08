import { Response } from 'express';

import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import CreatePartnerCommand from '@triumph/application/commands/partners/create-partner/create-partner.command';
import CreatePartnerUseCase from '@triumph/application/commands/partners/create-partner/create-partner.usecase';
import DeletePartnerCommand from '@triumph/application/commands/partners/delete-partner/delete-partner.command';
import DeletePartnerUseCase from '@triumph/application/commands/partners/delete-partner/delete-partner.usecase';
import UpdatePartnerCommand from '@triumph/application/commands/partners/update-partner/update-partner.command';
import UpdatePartnerUseCase from '@triumph/application/commands/partners/update-partner/update-partner.usecase';
import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found.error';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found.error';

@Controller('partners')
export default class PartnerWriterController {
  constructor(
    private readonly createPartnerUseCase: CreatePartnerUseCase,
    private readonly updatePartnerUseCase: UpdatePartnerUseCase,
    private readonly deletePartnerUseCase: DeletePartnerUseCase,
  ) {}

  @Post()
  async create(@Body() partnerPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createPartnerCommand = new CreatePartnerCommand(partnerPayload);

    const createdPartner = await this.createPartnerUseCase.execute(createPartnerCommand);

    if (createdPartner) {
      return response.status(HttpStatus.CREATED).json(createdPartner);
    }

    return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() partnerPayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const updatePartnerCommand = new UpdatePartnerCommand(id, partnerPayload);

    try {
      const updatedPartner = await this.updatePartnerUseCase.execute(updatePartnerCommand);

      if (updatedPartner) {
        return response.json(updatedPartner);
      }

      return response.sendStatus(HttpStatus.NOT_MODIFIED);
    } catch (error: any) {
      if (error instanceof PartnerNotFoundError || error instanceof DealerNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') partnerId: string, @Res() response: Response): Promise<Response> {
    try {
      const deletePartnerCommand = new DeletePartnerCommand(partnerId);

      await this.deletePartnerUseCase.execute(deletePartnerCommand);

      return response.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error: any) {
      if (error instanceof PartnerNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
