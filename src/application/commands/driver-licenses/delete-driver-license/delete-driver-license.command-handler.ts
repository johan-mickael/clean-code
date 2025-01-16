import DriverLicenseRepositoryWriter from '../../../ports/repositories/writers/driver-license-repository-writer';
import DeleteDriverLicenseCommand from './delete-driver-license.command';

export default class DeleteDriverLicenseCommandHandler {
  constructor(private readonly driverLicenseRepositoryWriter: DriverLicenseRepositoryWriter) {}

  async execute(deleteDriverLicenseCommand: DeleteDriverLicenseCommand): Promise<void> {
    const driverLicenseIdInput = deleteDriverLicenseCommand.driverLicenseId;

    await this.driverLicenseRepositoryWriter.delete(driverLicenseIdInput);
  }
}
