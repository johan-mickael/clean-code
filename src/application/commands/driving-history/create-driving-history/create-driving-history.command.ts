import { Command } from '../../common/command';

export default class CreateDrivingHistoryCommand implements Command {
  constructor(public readonly drivingHistoryPayload: any) {}
}
