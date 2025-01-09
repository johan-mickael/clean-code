import { Response } from 'express';

import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import CreatePreventiveMaintenanceForBikeModelCommand from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.command';
import CreatePreventiveMaintenanceForBikeModelUseCase from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.usecase';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';

@Controller('maintenance-schedules')
export default class MaintenanceScheduleWriterController {
  constructor(
    private readonly CreatePreventiveMaintenanceForBikeModelUseCase: CreatePreventiveMaintenanceForBikeModelUseCase,
  ) {}

  @Post()
  async create(@Body() maintenanceSchedulePayload: any, @Res() response: Response): Promise<Response> {
    try {
      const createMaintenanceScheduleCommand = CreatePreventiveMaintenanceForBikeModelCommand.validateAndCreateCommand({
        maintenanceScheduleLabel: maintenanceSchedulePayload['maintenance_schedule_label'],
        bikeModelId: maintenanceSchedulePayload['bike_model_id'],
        monthInterval: maintenanceSchedulePayload['month_interval'],
        mileageInterval: maintenanceSchedulePayload['mileage_interval'],
      });

      const createdMaintenanceSchedule = await this.CreatePreventiveMaintenanceForBikeModelUseCase.execute(
        createMaintenanceScheduleCommand,
      );

      return response.status(HttpStatus.CREATED).json(createdMaintenanceSchedule);
    } catch (error: unknown) {
      if (error instanceof BikeModelNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
