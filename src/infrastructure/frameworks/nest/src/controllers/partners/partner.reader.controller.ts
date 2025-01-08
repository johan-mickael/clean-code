import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetPartnerByIdentifierQuery from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.query';
import GetPartnerByIdentifierUseCase from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.usecase';
import ListPartnersQuery from '@triumph/application/queries/partners/list-partners/list-partners.query';
import ListPartnersUseCase from '@triumph/application/queries/partners/list-partners/list-partners.usecase';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found.error';

@Controller('partners')
export default class PartnerReaderController {
  constructor(
    private readonly listPartnersUseCase: ListPartnersUseCase,
    private readonly getPartnerByIdentifierUseCase: GetPartnerByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const partners = await this.listPartnersUseCase.execute(new ListPartnersQuery());

    return response.json(partners);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getPartnerQuery = new GetPartnerByIdentifierQuery(id);

    try {
      const partner = await this.getPartnerByIdentifierUseCase.execute(getPartnerQuery);
      return response.json(partner);
    } catch (error: unknown) {
      if (error instanceof PartnerNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
