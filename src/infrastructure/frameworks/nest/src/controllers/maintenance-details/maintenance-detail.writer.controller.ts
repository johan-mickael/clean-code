import { Response } from 'express';

import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import CreateMaintenanceDetailCommand from '@triumph/application/commands/maintenance-details/create-maintenance-detail/create-maintenance-detail.command';
import CreateMaintenanceDetailUseCase from '@triumph/application/commands/maintenance-details/create-maintenance-detail/create-maintenance-detail.usecase';
import DeleteMaintenanceDetailCommand from '@triumph/application/commands/maintenance-details/delete-maintenance-detail/delete-maintenance-detail.command';
import DeleteMaintenanceDetailUseCase from '@triumph/application/commands/maintenance-details/delete-maintenance-detail/delete-maintenance-detail.usecase';
import UpdateMaintenanceDetailCommand from '@triumph/application/commands/maintenance-details/update-maintenance-detail/update-maintenance-detail.command';
import UpdateMaintenanceDetailUseCase from '@triumph/application/commands/maintenance-details/update-maintenance-detail/update-maintenance-detail.usecase';

@Controller('maintenance-details')
export default class MaintenanceDetailWriterController {
  constructor(
    private readonly createMaintenanceDetailUseCase: CreateMaintenanceDetailUseCase,
    private readonly updateMaintenanceDetailUseCase: UpdateMaintenanceDetailUseCase,
    private readonly deleteMaintenanceDetailUseCase: DeleteMaintenanceDetailUseCase,
  ) {}

  @Post()
  async create(
    @Body() maintenanceDetailPayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const createMaintenanceDetailCommand = new CreateMaintenanceDetailCommand(maintenanceDetailPayload);
    const createdMaintenanceDetail = await this.createMaintenanceDetailUseCase.execute(createMaintenanceDetailCommand);
    return response.status(HttpStatus.CREATED).json(createdMaintenanceDetail);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() maintenanceDetailPayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const updateMaintenanceDetailCommand = new UpdateMaintenanceDetailCommand(id, maintenanceDetailPayload);
    const updatedMaintenanceDetail = await this.updateMaintenanceDetailUseCase.execute(updateMaintenanceDetailCommand);
    return response.json(updatedMaintenanceDetail);
  }

  @Delete(':id')
  async delete(@Param('id') maintenanceDetailId: string, @Res() response: Response): Promise<Response> {
    const deleteMaintenanceDetailCommand = new DeleteMaintenanceDetailCommand(maintenanceDetailId);
    await this.deleteMaintenanceDetailUseCase.execute(deleteMaintenanceDetailCommand);
    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
