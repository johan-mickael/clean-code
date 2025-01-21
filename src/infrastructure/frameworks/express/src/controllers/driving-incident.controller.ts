import { Request, Response } from 'express';

import CreateDrivingIncidentCommand from '@triumph/application/commands/driving-incidents/create-driving-incident/create-driving-incident.command';
import CreateDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/create-driving-incident/create-driving-incident.usecase';
import DeleteDrivingIncidentCommand from '@triumph/application/commands/driving-incidents/delete-driving-incident/delete-driving-incident.command';
import DeleteDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/delete-driving-incident/delete-driving-incident.usecase';
import UpdateDrivingIncidentCommand from '@triumph/application/commands/driving-incidents/update-driving-incident/update-driving-incident.command';
import UpdateDrivingIncidentUseCase from '@triumph/application/commands/driving-incidents/update-driving-incident/update-driving-incident.usecase';
import GetDrivingIncidentByIdQuery from '@triumph/application/queries/driving-incidents/get-driving-incident-by-identifier/get-driving-incident-by-identifier.query';
import GetDrivingIncidentByIdUseCase from '@triumph/application/queries/driving-incidents/get-driving-incident-by-identifier/get-driving-incident-by-identifier.usecase';
import ListDrivingIncidentsQuery from '@triumph/application/queries/driving-incidents/list-driving-incidents/list-driving-incidents.query';
import ListDrivingIncidentsUseCase from '@triumph/application/queries/driving-incidents/list-driving-incidents/list-driving-incidents.usecase';
import { DrivingIncidentNotFoundError } from '@triumph/domain/errors/driving-incidents/driving-incident-not-found.error';

export default class DrivingIncidentController {
  constructor(
    private readonly listDrivingIncidentsUseCase: ListDrivingIncidentsUseCase,
    private readonly getDrivingIncidentByIdUseCase: GetDrivingIncidentByIdUseCase,
    private readonly createDrivingIncidentUseCase: CreateDrivingIncidentUseCase,
    private readonly updateDrivingIncidentUseCase: UpdateDrivingIncidentUseCase,
    private readonly deleteDrivingIncidentUseCase: DeleteDrivingIncidentUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const drivingIncidents = await this.listDrivingIncidentsUseCase.execute(new ListDrivingIncidentsQuery());
    return res.status(200).json(drivingIncidents);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params;
    try {
      const drivingIncident = await this.getDrivingIncidentByIdUseCase.execute(new GetDrivingIncidentByIdQuery(id));
      return res.status(200).json(drivingIncident);
    } catch (error) {
      if (error instanceof DrivingIncidentNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const createDrivingIncidentCommand = new CreateDrivingIncidentCommand(req.body);
      const createdDrivingIncident = await this.createDrivingIncidentUseCase.execute(createDrivingIncidentCommand);
      return res.status(201).json(createdDrivingIncident);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: any): Promise<Response> {
    const { id: drivingIncidentIdToUpdate } = req.params;
    try {
      const updateDrivingIncidentCommand = new UpdateDrivingIncidentCommand(drivingIncidentIdToUpdate, req.body);
      const updatedDrivingIncident = await this.updateDrivingIncidentUseCase.execute(updateDrivingIncidentCommand);
      return res.status(200).json(updatedDrivingIncident);
    } catch (error) {
      if (error instanceof DrivingIncidentNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: any): Promise<Response> {
    const { id: drivingIncidentIdToDelete } = req.params;
    try {
      const deleteDrivingIncidentCommand = new DeleteDrivingIncidentCommand(drivingIncidentIdToDelete);
      await this.deleteDrivingIncidentUseCase.execute(deleteDrivingIncidentCommand);
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof DrivingIncidentNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }
}
