import { Response } from 'express';

import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import CreateDriverLicenseCommand from '@triumph/application/commands/driver-licenses/create-driver-license/create-driver-license.command';
import CreateDriverLicenseUseCase from '@triumph/application/commands/driver-licenses/create-driver-license/create-driver-license.usecase';
import DeleteDriverLicenseCommand from '@triumph/application/commands/driver-licenses/delete-driver-license/delete-driver-license.command';
import DeleteDriverLicenseUseCase from '@triumph/application/commands/driver-licenses/delete-driver-license/delete-driver-license.usecase';
import UpdateDriverLicenseCommand from '@triumph/application/commands/driver-licenses/update-driver-license/update-driver-license.command';
import UpdateDriverLicenseUseCase from '@triumph/application/commands/driver-licenses/update-driver-license/update-driver-license.usecase';

@Controller('driver-licenses')
export default class DriverLicenseWriterController {
  constructor(
    private readonly createDriverLicenseUseCase: CreateDriverLicenseUseCase,
    private readonly updateDriverLicenseUseCase: UpdateDriverLicenseUseCase,
    private readonly deleteDriverLicenseUseCase: DeleteDriverLicenseUseCase,
  ) {}

  @Post()
  async create(@Body() driverLicensePayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createDriverLicenseCommand = new CreateDriverLicenseCommand(driverLicensePayload);
    const createdDriverLicense = await this.createDriverLicenseUseCase.execute(createDriverLicenseCommand);
    return response.status(HttpStatus.CREATED).json(createdDriverLicense);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() driverLicensePayload: Record<string, unknown>,
    @Res() response: Response,
  ): Promise<Response> {
    const updateDriverLicenseCommand = new UpdateDriverLicenseCommand(id, driverLicensePayload);
    const updatedDriverLicense = await this.updateDriverLicenseUseCase.execute(updateDriverLicenseCommand);
    return response.json(updatedDriverLicense);
  }

  @Delete(':id')
  async delete(@Param('id') driverLicenseId: string, @Res() response: Response): Promise<Response> {
    const deleteDriverLicenseCommand = new DeleteDriverLicenseCommand(driverLicenseId);
    await this.deleteDriverLicenseUseCase.execute(deleteDriverLicenseCommand);
    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
