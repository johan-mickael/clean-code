import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetDrivingHistoryByIdentifierQuery from '@triumph/application/queries/driving-history/get-driving-history-by-identifier/get-driving-history-by-identifier.query';
import GetDrivingHistoryByIdentifierUseCase from '@triumph/application/queries/driving-history/get-driving-history-by-identifier/get-driving-history-by-identifier.usecase';
import ListDrivingHistoriesQuery from '@triumph/application/queries/driving-history/list-driving-history/list-driving-history.query';
import ListDrivingHistoriesUseCase from '@triumph/application/queries/driving-history/list-driving-history/list-driving-history.usecase';

@Controller('driving-history')
export default class DrivingHistoryReaderController {
  constructor(
    private readonly listDrivingHistoriesUseCase: ListDrivingHistoriesUseCase,
    private readonly getDrivingHistoryByIdentifierUseCase: GetDrivingHistoryByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const histories = await this.listDrivingHistoriesUseCase.execute(new ListDrivingHistoriesQuery());
    return response.json(histories);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getHistoryQuery = new GetDrivingHistoryByIdentifierQuery(id);

    try {
      const history = await this.getDrivingHistoryByIdentifierUseCase.execute(getHistoryQuery);
      return response.json(history);
    } catch (error) {
      return response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
