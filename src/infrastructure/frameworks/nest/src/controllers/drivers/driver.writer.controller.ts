import { Controller, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import CreateDriverCommand from '@triumph/application/commands/drivers/create-driver/create-driver.command';
import CreateDriverUseCase from '@triumph/application/commands/drivers/create-driver/create-driver.usecase';
import UpdateDriverCommand from '@triumph/application/commands/drivers/update-driver/update-driver.command';
import UpdateDriverUseCase from '@triumph/application/commands/drivers/update-driver/update-driver.usecase';
import DeleteDriverCommand from '@triumph/application/commands/drivers/delete-driver/delete-driver.command';
import DeleteDriverUseCase from '@triumph/application/commands/drivers/delete-driver/delete-driver.usecase';

@Controller('drivers')
export default class DriverWriterController {
  constructor(
    private readonly createDriverUseCase: CreateDriverUseCase,
    private readonly updateDriverUseCase: UpdateDriverUseCase,
    private readonly deleteDriverUseCase: DeleteDriverUseCase,
  ) {}

  @Post()
  async create(@Body() driverPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createDriverCommand = new CreateDriverCommand(driverPayload);
    const createdDriver = await this.createDriverUseCase.execute(createDriverCommand);
    return response.status(HttpStatus.CREATED).json(createdDriver);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() driverPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const updateDriverCommand = new UpdateDriverCommand(id, driverPayload);
    const updatedDriver = await this.updateDriverUseCase.execute(updateDriverCommand);
    return response.json(updatedDriver);
  }

  @Delete(':id')
  async delete(@Param('id') driverId: string, @Res() response: Response): Promise<Response> {
    const deleteDriverCommand = new DeleteDriverCommand(driverId);
    await this.deleteDriverUseCase.execute(deleteDriverCommand);
    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
