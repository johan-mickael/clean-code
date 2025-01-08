import { Response } from 'express';
import { Error as SequelizeError } from 'sequelize';

import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import CreatePreventiveMaintenanceForBikeModelCommand from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.command';
import CreatePreventiveMaintenanceForBikeModelUseCase from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.usecase';
import { BikeModel } from '@triumph/domain/entity/bike-model';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';

@Controller('maintenance-schedules')
export default class MaintenanceScheduleWriterController {
  constructor(
    private readonly CreatePreventiveMaintenanceForBikeModelUseCase: CreatePreventiveMaintenanceForBikeModelUseCase,
  ) {}

  @Post()
  async create(
    @Body() maintenanceSchedulePayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const preventiveMaintenanceScheduleData = {
        maintenanceScheduleLabel: maintenanceSchedulePayload['maintenanceScheduleLabel'] as string,
        bikeModelId: maintenanceSchedulePayload['bikeModelId'] as string,
        monthInterval: maintenanceSchedulePayload['monthInterval'] as number,
        mileageInterval: maintenanceSchedulePayload['mileageInterval'] as number,
      };
      const createMaintenanceScheduleCommand = CreatePreventiveMaintenanceForBikeModelCommand.validateAndCreateCommand(
        preventiveMaintenanceScheduleData,
      );

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
