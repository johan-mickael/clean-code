import { Command } from '../../common/command';

export default class UpdateDrivingHistoryCommand implements Command {
  constructor(
    public readonly drivingHistoryId: string,
    public readonly drivingHistoryPayload: any,
  ) {}
}
