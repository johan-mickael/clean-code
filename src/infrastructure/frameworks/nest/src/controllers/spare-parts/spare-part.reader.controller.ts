import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetSparePartByIdentifierQuery from '@triumph/application/queries/spare-parts/get-spare-part-by-identifier/get-spare-part-by-identifier.query';
import GetSparePartByIdentifierUseCase from '@triumph/application/queries/spare-parts/get-spare-part-by-identifier/get-spare-part-by-identifier.usecase';
import ListSparePartsQuery from '@triumph/application/queries/spare-parts/list-spare-parts/list-spare-parts.query';
import ListSparePartsUseCase from '@triumph/application/queries/spare-parts/list-spare-parts/list-spare-parts.usecase';
import { SparePartNotFoundError } from '@triumph/domain/errors/spare-parts/spare-part-not-found.error';

@Controller('spare-parts')
export default class SparePartReaderController {
  constructor(
    private readonly listSparePartsUseCase: ListSparePartsUseCase,
    private readonly getSparePartByIdentifierUseCase: GetSparePartByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const spareParts = await this.listSparePartsUseCase.execute(new ListSparePartsQuery());

    return response.json(spareParts);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getSparePartQuery = new GetSparePartByIdentifierQuery(id);

    try {
      const sparePart = await this.getSparePartByIdentifierUseCase.execute(getSparePartQuery);
      return response.json(sparePart);
    } catch (error: unknown) {
      if (error instanceof SparePartNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
