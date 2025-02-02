import { Response } from 'express';

import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import CreateDrivingHistoryCommand from '@triumph/application/commands/driving-history/create-driving-history/create-driving-history.command';
import CreateDrivingHistoryUseCase from '@triumph/application/commands/driving-history/create-driving-history/create-driving-history.usecase';
import DeleteDrivingHistoryCommand from '@triumph/application/commands/driving-history/delete-driving-history/delete-driving-history.command';
import DeleteDrivingHistoryUseCase from '@triumph/application/commands/driving-history/delete-driving-history/delete-driving-history.usecase';
import UpdateDrivingHistoryCommand from '@triumph/application/commands/driving-history/update-driving-history/update-driving-history.command';
import UpdateDrivingHistoryUseCase from '@triumph/application/commands/driving-history/update-driving-history/update-driving-history.usecase';

@Controller('driving-history')
export default class DrivingHistoryWriterController {
  constructor(
    private readonly createDrivingHistoryUseCase: CreateDrivingHistoryUseCase,
    private readonly updateDrivingHistoryUseCase: UpdateDrivingHistoryUseCase,
    private readonly deleteDrivingHistoryUseCase: DeleteDrivingHistoryUseCase,
  ) {}

  @Post()
  async create(@Body() drivingHistoryPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createDrivingHistoryCommand = new CreateDrivingHistoryCommand(drivingHistoryPayload);
    const createdDrivingHistory = await this.createDrivingHistoryUseCase.execute(createDrivingHistoryCommand);
    return response.status(HttpStatus.CREATED).json(createdDrivingHistory);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() drivingHistoryPayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const updateDrivingHistoryCommand = new UpdateDrivingHistoryCommand(id, drivingHistoryPayload);
    const updatedDrivingHistory = await this.updateDrivingHistoryUseCase.execute(updateDrivingHistoryCommand);
    return response.json(updatedDrivingHistory);
  }

  @Delete(':id')
  async delete(@Param('id') drivingHistoryId: string, @Res() response: Response): Promise<Response> {
    const deleteDrivingHistoryCommand = new DeleteDrivingHistoryCommand(drivingHistoryId);
    await this.deleteDrivingHistoryUseCase.execute(deleteDrivingHistoryCommand);
    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
