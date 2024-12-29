import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer-repository-reader';
import GetDealerByIdentifierQuery from '@triumph/application/queries/dealers/get-dealer-by-identifier/get-dealer-by-identifier-query';
import GetDealerByIdentifierQueryHandler from '@triumph/application/queries/dealers/get-dealer-by-identifier/get-dealer-by-identifier-query-handler';
import ListDealersQuery from '@triumph/application/queries/dealers/list-dealers/list-dealers-query';
import ListDealersQueryHandler from '@triumph/application/queries/dealers/list-dealers/list-dealers-query-handler';
import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found-error';

@Controller('dealers')
export default class DealerController {
  constructor(private readonly dealerRepositoryReader: DealerRepositoryReader) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const listDealersUseCase = new ListDealersQueryHandler(this.dealerRepositoryReader);
    const dealers = await listDealersUseCase.execute(new ListDealersQuery());

    return response.json(dealers);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getDealerUsecase = new GetDealerByIdentifierQueryHandler(this.dealerRepositoryReader);
    const getDealerQuery = new GetDealerByIdentifierQuery(id);

    try {
      const dealer = await getDealerUsecase.execute(getDealerQuery);
      return response.json(dealer);
    } catch (error: unknown) {
      if (error instanceof DealerNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
