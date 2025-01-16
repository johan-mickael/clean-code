import { Command } from '../../common/command';

export default class UpdateDrivingIncidentCommand implements Command {
  constructor(
    public readonly drivingIncidentId: string,
    public readonly drivingIncidentPayload: any,
  ) {}
}
