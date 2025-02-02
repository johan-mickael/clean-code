import { Response } from 'express';

import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import CreateCurativeMaintenanceForBikeCommand from '@triumph/application/commands/create-curative-maintenance-for-bike/create-curative-maintenance-for-bike.command';
import CreateCreativeMaintenanceForBikeUseCase from '@triumph/application/commands/create-curative-maintenance-for-bike/create-curative-maintenance-for-bike.usecase';
import { BikeNotFoundError } from '@triumph/domain/errors/bikes/bike-not-found.error';

@Controller('maintenances')
export default class MaintenanceWriterController {
  constructor(private readonly CreateCurativeMaintenanceForBikeUseCase: CreateCreativeMaintenanceForBikeUseCase) {}

  @Post()
  async createMaintenanceSchedule(@Body() maintenancePayload: any, @Res() response: Response): Promise<Response> {
    try {
      const createMaintenanceScheduleCommand = CreateCurativeMaintenanceForBikeCommand.validateAndCreateCommand({
        maintenanceLabel: maintenancePayload['maintenance_label'],
        bikeId: maintenancePayload['bike_id'],
        maintenanceDate: maintenancePayload['maintenance_date'],
      });

      const createdMaintenance = await this.CreateCurativeMaintenanceForBikeUseCase.execute(
        createMaintenanceScheduleCommand,
      );

      return response.status(HttpStatus.CREATED).json(createdMaintenance);
    } catch (error: unknown) {
      if (error instanceof BikeNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
