import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import CreateDrivingIncidentCommand from './create-driving-incident.command';

export default abstract class CreateDrivingIncidentUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createDrivingIncidentCommand: CreateDrivingIncidentCommand): Promise<DrivingIncidentDTO>;
}
