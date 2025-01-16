import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import GetDrivingIncidentByIdentifierQuery from '@triumph/application/queries/driving-incidents/get-driving-incident-by-identifier/get-driving-incident-by-identifier.query';
import GetDrivingIncidentByIdentifierUseCase from '@triumph/application/queries/driving-incidents/get-driving-incident-by-identifier/get-driving-incident-by-identifier.usecase';
import ListDrivingIncidentsQuery from '@triumph/application/queries/driving-incidents/list-driving-incidents/list-driving-incidents.query';
import ListDrivingIncidentsUseCase from '@triumph/application/queries/driving-incidents/list-driving-incidents/list-driving-incidents.usecase';

@Controller('driving-incidents')
export default class DrivingIncidentReaderController {
  constructor(
    private readonly listDrivingIncidentsUseCase: ListDrivingIncidentsUseCase,
    private readonly getDrivingIncidentByIdentifierUseCase: GetDrivingIncidentByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const incidents = await this.listDrivingIncidentsUseCase.execute(new ListDrivingIncidentsQuery());
    return response.json(incidents);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getIncidentQuery = new GetDrivingIncidentByIdentifierQuery(id);

    try {
      const incident = await this.getDrivingIncidentByIdentifierUseCase.execute(getIncidentQuery);
      return response.json(incident);
    } catch (error) {
      return response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
