import { Controller, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import CreateDrivingIncidentCommand from '@triumph/application/commands/driving-incidents/create-driving-incident/create-driving-incident.command';
import CreateDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/create-driving-incident/create-driving-incident.usecase';
import UpdateDrivingIncidentCommand from '@triumph/application/commands/driving-incidents/update-driving-incident/update-driving-incident.command';
import UpdateDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/update-driving-incident/update-driving-incident.usecase';
import DeleteDrivingIncidentCommand from '@triumph/application/commands/driving-incidents/delete-driving-incident/delete-driving-incident.command';
import DeleteDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/delete-driving-incident/delete-driving-incident.usecase';

@Controller('driving-incidents')
export default class DrivingIncidentWriterController {
  constructor(
    private readonly createDrivingIncidentUseCase: CreateDrivingIncidentUseCase,
    private readonly updateDrivingIncidentUseCase: UpdateDrivingIncidentUseCase,
    private readonly deleteDrivingIncidentUseCase: DeleteDrivingIncidentUseCase,
  ) {}

  @Post()
  async create(@Body() drivingIncidentPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createDrivingIncidentCommand = new CreateDrivingIncidentCommand(drivingIncidentPayload);
    const createdDrivingIncident = await this.createDrivingIncidentUseCase.execute(createDrivingIncidentCommand);
    return response.status(HttpStatus.CREATED).json(createdDrivingIncident);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() drivingIncidentPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const updateDrivingIncidentCommand = new UpdateDrivingIncidentCommand(id, drivingIncidentPayload);
    const updatedDrivingIncident = await this.updateDrivingIncidentUseCase.execute(updateDrivingIncidentCommand);
    return response.json(updatedDrivingIncident);
  }

  @Delete(':id')
  async delete(@Param('id') drivingIncidentId: string, @Res() response: Response): Promise<Response> {
    const deleteDrivingIncidentCommand = new DeleteDrivingIncidentCommand(drivingIncidentId);
    await this.deleteDrivingIncidentUseCase.execute(deleteDrivingIncidentCommand);
    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
