import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetDriverByIdentifierQuery from '@triumph/application/queries/drivers/get-driver-by-identifier/get-driver-by-identifier.query';
import GetDriverByIdentifierUseCase from '@triumph/application/queries/drivers/get-driver-by-identifier/get-driver-by-identifier.usecase';
import ListDriversQuery from '@triumph/application/queries/drivers/list-drivers/list-drivers.query';
import ListDriversUseCase from '@triumph/application/queries/drivers/list-drivers/list-drivers.usecase';

@Controller('drivers')
export default class DriverReaderController {
  constructor(
    private readonly listDriversUseCase: ListDriversUseCase,
    private readonly getDriverByIdentifierUseCase: GetDriverByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const drivers = await this.listDriversUseCase.execute(new ListDriversQuery());
    return response.json(drivers);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getDriverQuery = new GetDriverByIdentifierQuery(id);

    try {
      const driver = await this.getDriverByIdentifierUseCase.execute(getDriverQuery);
      return response.json(driver);
    } catch (error) {
      return response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
