import { Command } from '../../common/command';

export default class DeleteDrivingHistoryCommand implements Command {
  constructor(public readonly drivingHistoryId: string) {}
}
