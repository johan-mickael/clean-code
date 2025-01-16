import DrivingHistoryRepositoryWriter from '../../../ports/repositories/writers/driving-history-repository-writer';
import DeleteDrivingHistoryCommand from './delete-driving-history.command';

export default class DeleteDrivingHistoryCommandHandler {
  constructor(private readonly drivingHistoryRepositoryWriter: DrivingHistoryRepositoryWriter) {}

  async execute(deleteDrivingHistoryCommand: DeleteDrivingHistoryCommand): Promise<void> {
    const drivingHistoryIdInput = deleteDrivingHistoryCommand.drivingHistoryId;

    await this.drivingHistoryRepositoryWriter.delete(drivingHistoryIdInput);
  }
}
