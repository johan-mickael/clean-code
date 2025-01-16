import { Response } from 'express';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import GetMaintenanceByIdentifierQuery from '@triumph/application/queries/maintenances/get-maintenance-by-identifier/get-maintenance-by-identifier.query';
import GetMaintenanceByIdentifierUseCase from '@triumph/application/queries/maintenances/get-maintenance-by-identifier/get-maintenance-by-identifier.usecase';
import ListMaintenancesQuery from '@triumph/application/queries/maintenances/list-maintenances/list-maintenances.query';
import ListMaintenancesUseCase from '@triumph/application/queries/maintenances/list-maintenances/list-maintenances.usecase';
import { MaintenanceNotFoundError } from '@triumph/domain/errors/maintenances/maintenance-not-found.error';

@Controller('maintenances')
export default class MaintenanceReaderController {
  constructor(
    private readonly listMaintenancesUseCase: ListMaintenancesUseCase,
    private readonly getMaintenanceByIdentifierUseCase: GetMaintenanceByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const maintenances = await this.listMaintenancesUseCase.execute(new ListMaintenancesQuery());

    return response.json(maintenances);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getMaintenanceQuery = new GetMaintenanceByIdentifierQuery(id);

    try {
      const maintenance = await this.getMaintenanceByIdentifierUseCase.execute(getMaintenanceQuery);
      return response.json(maintenance);
    } catch (error: unknown) {
      if (error instanceof MaintenanceNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
