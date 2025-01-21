import { Request, Response } from 'express';

import CreateDriverCommand from '@triumph/application/commands/drivers/create-driver/create-driver.command';
import CreateDriverUseCase from '@triumph/application/commands/drivers/create-driver/create-driver.usecase';
import DeleteDriverCommand from '@triumph/application/commands/drivers/delete-driver/delete-driver.command';
import DeleteDriverUseCase from '@triumph/application/commands/drivers/delete-driver/delete-driver.usecase';
import UpdateDriverCommand from '@triumph/application/commands/drivers/update-driver/update-driver.command';
import UpdateDriverUseCase from '@triumph/application/commands/drivers/update-driver/update-driver.usecase';
import GetDriverByIdQuery from '@triumph/application/queries/drivers/get-driver-by-identifier/get-driver-by-identifier.query';
import GetDriverByIdUseCase from '@triumph/application/queries/drivers/get-driver-by-identifier/get-driver-by-identifier.usecase';
import ListDriversQuery from '@triumph/application/queries/drivers/list-drivers/list-drivers.query';
import ListDriversUseCase from '@triumph/application/queries/drivers/list-drivers/list-drivers.usecase';
import { DriverNotFoundError } from '@triumph/domain/errors/drivers/driver-not-found.error';

export default class DriverController {
  constructor(
    private readonly listDriversUseCase: ListDriversUseCase,
    private readonly getDriverByIdUseCase: GetDriverByIdUseCase,
    private readonly createDriverUseCase: CreateDriverUseCase,
    private readonly updateDriverUseCase: UpdateDriverUseCase,
    private readonly deleteDriverUseCase: DeleteDriverUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const drivers = await this.listDriversUseCase.execute(new ListDriversQuery());
    return res.status(200).json(drivers);
  }

  async getById(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params;
    try {
      const driver = await this.getDriverByIdUseCase.execute(new GetDriverByIdQuery(id));
      return res.status(200).json(driver);
    } catch (error) {
      if (error instanceof DriverNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const createDriverCommand = new CreateDriverCommand(req.body);
      const createdDriver = await this.createDriverUseCase.execute(createDriverCommand);
      return res.status(201).json(createdDriver);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: any): Promise<Response> {
    const { id: driverIdToUpdate } = req.params;
    try {
      const updateDriverCommand = new UpdateDriverCommand(driverIdToUpdate, req.body);
      const updatedDriver = await this.updateDriverUseCase.execute(updateDriverCommand);
      return res.status(200).json(updatedDriver);
    } catch (error) {
      if (error instanceof DriverNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: any): Promise<Response> {
    const { id: driverIdToDelete } = req.params;
    try {
      const deleteDriverCommand = new DeleteDriverCommand(driverIdToDelete);
      await this.deleteDriverUseCase.execute(deleteDriverCommand);
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof DriverNotFoundError) {
        return res.sendStatus(404);
      }
      return next(error);
    }
  }
}
