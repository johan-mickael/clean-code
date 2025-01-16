import { Command } from '../../common/command';

export default class DeleteDriverLicenseCommand implements Command {
  constructor(public readonly driverLicenseId: string) {}
}
