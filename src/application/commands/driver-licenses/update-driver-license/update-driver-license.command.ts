import { Command } from '../../common/command';

export default class UpdateDriverLicenseCommand implements Command {
  constructor(
    public readonly driverLicenseId: string,
    public readonly driverLicensePayload: any,
  ) {}
}
