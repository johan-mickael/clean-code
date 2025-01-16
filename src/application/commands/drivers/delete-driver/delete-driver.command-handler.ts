import DriverRepositoryWriter from '../../../ports/repositories/writers/driver-repository-writer';
import DeleteDriverCommand from './delete-driver.command';

export default class DeleteDriverCommandHandler {
  constructor(private readonly driverRepositoryWriter: DriverRepositoryWriter) {}

  async execute(deleteDriverCommand: DeleteDriverCommand): Promise<void> {
    const driverIdInput = deleteDriverCommand.driverId;

    await this.driverRepositoryWriter.delete(driverIdInput);
  }
}
