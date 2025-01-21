import { Request, Response } from 'express';

import CreateDrivingHistoryCommand from '@triumph/application/commands/driving-history/create-driving-history/create-driving-history.command';
import CreateDrivingHistoryUseCase from '@triumph/application/commands/driving-history/create-driving-history/create-driving-history.usecase';
import DeleteDrivingHistoryCommand from '@triumph/application/commands/driving-history/delete-driving-history/delete-driving-history.command';
import DeleteDrivingHistoryUseCase from '@triumph/application/commands/driving-history/delete-driving-history/delete-driving-history.usecase';
import UpdateDrivingHistoryCommand from '@triumph/application/commands/driving-history/update-driving-history/update-driving-history.command';
import UpdateDrivingHistoryUseCase from '@triumph/application/commands/driving-history/update-driving-history/update-driving-history.usecase';
import GetDrivingHistoryByIdQuery from '@triumph/application/queries/driving-history/get-driving-history-by-identifier/get-driving-history-by-identifier.query';
import GetDrivingHistoryByIdUseCase from '@triumph/application/queries/driving-history/get-driving-history-by-identifier/get-driving-history-by-identifier.usecase';
import ListDrivingHistoriesQuery from '@triumph/application/queries/driving-history/list-driving-history/list-driving-history.query';
import ListDrivingHistoriesUseCase from '@triumph/application/queries/driving-history/list-driving-history/list-driving-history.usecase';
import { DrivingHistoryNotFoundError } from '@triumph/domain/errors/driving-history/driving-history-not-found.error';

export default class DrivingHistoryController {
  constructor(
    private readonly listDrivingHistoriesUseCase: ListDrivingHistoriesUseCase,
    private readonly getDrivingHistoryByIdUseCase: GetDrivingHistoryByIdUseCase,
    private readonly createDrivingHistoryUseCase: CreateDrivingHistoryUseCase,
    private readonly updateDrivingHistoryUseCase: UpdateDrivingHistoryUseCase,
    private readonly deleteDrivingHistoryUseCase: DeleteDrivingHistoryUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const drivingHistories = await this.listDrivingHistoriesUseCase.execute(new ListDrivingHistoriesQuery());
    return res.status(200).json(drivingHistories);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params;
    try {
      const drivingHistory = await this.getDrivingHistoryByIdUseCase.execute(new GetDrivingHistoryByIdQuery(id));
      return res.status(200).json(drivingHistory);
    } catch (error) {
      if (error instanceof DrivingHistoryNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const createDrivingHistoryCommand = new CreateDrivingHistoryCommand(req.body);
      const createdDrivingHistory = await this.createDrivingHistoryUseCase.execute(createDrivingHistoryCommand);
      return res.status(201).json(createdDrivingHistory);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: any): Promise<Response> {
    const { id: drivingHistoryIdToUpdate } = req.params;
    try {
      const updateDrivingHistoryCommand = new UpdateDrivingHistoryCommand(drivingHistoryIdToUpdate, req.body);
      const updatedDrivingHistory = await this.updateDrivingHistoryUseCase.execute(updateDrivingHistoryCommand);
      return res.status(200).json(updatedDrivingHistory);
    } catch (error) {
      if (error instanceof DrivingHistoryNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: any): Promise<Response> {
    const { id: drivingHistoryIdToDelete } = req.params;
    try {
      const deleteDrivingHistoryCommand = new DeleteDrivingHistoryCommand(drivingHistoryIdToDelete);
      await this.deleteDrivingHistoryUseCase.execute(deleteDrivingHistoryCommand);
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof DrivingHistoryNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }
}
