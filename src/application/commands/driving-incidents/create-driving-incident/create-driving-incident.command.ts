import { Command } from '../../common/command';

export default class CreateDrivingIncidentCommand implements Command {
  constructor(public readonly drivingIncidentPayload: any) {}
}
