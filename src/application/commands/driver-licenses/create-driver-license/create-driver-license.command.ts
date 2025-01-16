import { Command } from '../../common/command';

export default class CreateDriverLicenseCommand implements Command {
  constructor(public readonly driverLicensePayload: any) {}
}
