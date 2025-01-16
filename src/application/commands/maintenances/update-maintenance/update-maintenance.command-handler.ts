import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import MaintenanceDTOMapper from '../../../interfaces/mappers/maintenance.dto-mapper';
import MaintenanceRepositoryWriter from '../../../ports/repositories/writers/maintenance-repository-writer';
import UpdateMaintenanceCommand from './update-maintenance.command';

export default class UpdateMaintenanceCommandHandler {
  constructor(private readonly maintenanceRepositoryWriter: MaintenanceRepositoryWriter) {}

  async execute(updateMaintenanceCommand: UpdateMaintenanceCommand): Promise<MaintenanceDTO> {
    const { maintenanceId, maintenancePayload } = updateMaintenanceCommand;
    const { label, bikeId, lastMaintenanceDate, nextMaintenanceDate, maintenanceType } = maintenancePayload;

    const maintenanceDTO = new MaintenanceDTO(maintenanceId, label, bikeId, lastMaintenanceDate, nextMaintenanceDate, maintenanceType);
    const updatedMaintenance = await this.maintenanceRepositoryWriter.update(maintenanceId, maintenanceDTO);

    return MaintenanceDTOMapper.toDTO(updatedMaintenance);
  }
}
