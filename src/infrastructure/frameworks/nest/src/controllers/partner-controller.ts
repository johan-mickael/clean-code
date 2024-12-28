import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/partner-repository-reader';
import ListPartnersQueryHandler from '@triumph/application/queries/partners/list-partners/list-partners-query-handler';
import ListPartnersQuery from '@triumph/application/queries/partners/list-partners/list-partners-query';
import GetPartnerByIdentifierQueryHandler from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier-query-handler';
import GetPartnerByIdentifierQuery from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier-query';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found-error';
import { Response } from 'express';

@Controller('partners')
export default class PartnerController {
  constructor(private readonly partnerRepositoryReader: PartnerRepositoryReader) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const listPartnersUseCase = new ListPartnersQueryHandler(this.partnerRepositoryReader);
    const partners = await listPartnersUseCase.execute(new ListPartnersQuery());

    return response.json(partners);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getPartnerUsecase = new GetPartnerByIdentifierQueryHandler(this.partnerRepositoryReader);
    const getPartnerQuery = new GetPartnerByIdentifierQuery(id);

    try {
      const partner = await getPartnerUsecase.execute(getPartnerQuery);
      return response.json(partner);
    } catch (error: unknown) {
      if (error instanceof PartnerNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
