import { Command } from '../../common/command';

export default class DeleteDrivingIncidentCommand implements Command {
  constructor(public readonly drivingIncidentId: string) {}
}
