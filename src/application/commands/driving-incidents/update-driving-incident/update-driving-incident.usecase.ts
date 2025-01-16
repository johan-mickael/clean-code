import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import UpdateDrivingIncidentCommand from './update-driving-incident.command';

export default abstract class UpdateDrivingIncidentUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateDrivingIncidentCommand: UpdateDrivingIncidentCommand): Promise<DrivingIncidentDTO>;
}
