import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import GetDriverLicenseByIdentifierQuery from '@triumph/application/queries/driver-licenses/get-driver-license-by-identifier/get-driver-license-by-identifier.query';
import GetDriverLicenseByIdentifierUseCase from '@triumph/application/queries/driver-licenses/get-driver-license-by-identifier/get-driver-license-by-identifier.usecase';
import ListDriverLicensesQuery from '@triumph/application/queries/driver-licenses/list-driver-licenses/list-driver-licenses.query';
import ListDriverLicensesUseCase from '@triumph/application/queries/driver-licenses/list-driver-licenses/list-driver-licenses.usecase';

@Controller('driver-licenses')
export default class DriverLicenseReaderController {
  constructor(
    private readonly listDriverLicensesUseCase: ListDriverLicensesUseCase,
    private readonly getDriverLicenseByIdentifierUseCase: GetDriverLicenseByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const licenses = await this.listDriverLicensesUseCase.execute(new ListDriverLicensesQuery());
    return response.json(licenses);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getLicenseQuery = new GetDriverLicenseByIdentifierQuery(id);

    try {
      const license = await this.getDriverLicenseByIdentifierUseCase.execute(getLicenseQuery);
      return response.json(license);
    } catch (error) {
      return response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
