import { Response } from 'express';

import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetMaintenanceDetailByIdentifierQuery from '@triumph/application/queries/maintenance-details/get-maintenance-detail-by-identifier/get-maintenance-detail-by-identifier.query';
import GetMaintenanceDetailByIdentifierUseCase from '@triumph/application/queries/maintenance-details/get-maintenance-detail-by-identifier/get-maintenance-detail-by-identifier.usecase';
import ListMaintenanceDetailsQuery from '@triumph/application/queries/maintenance-details/list-maintenance-details/list-maintenance-details.query';
import ListMaintenanceDetailsUseCase from '@triumph/application/queries/maintenance-details/list-maintenance-details/list-maintenance-details.usecase';

@Controller('maintenance-details')
export default class MaintenanceDetailReaderController {
  constructor(
    private readonly listMaintenanceDetailsUseCase: ListMaintenanceDetailsUseCase,
    private readonly getMaintenanceDetailByIdentifierUseCase: GetMaintenanceDetailByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const maintenanceDetails = await this.listMaintenanceDetailsUseCase.execute(new ListMaintenanceDetailsQuery());
    return response.json(maintenanceDetails);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getMaintenanceDetailQuery = new GetMaintenanceDetailByIdentifierQuery(id);

    try {
      const maintenanceDetail = await this.getMaintenanceDetailByIdentifierUseCase.execute(getMaintenanceDetailQuery);
      return response.json(maintenanceDetail);
    } catch (error) {
      return response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
