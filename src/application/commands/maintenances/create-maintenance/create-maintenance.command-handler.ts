import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import MaintenanceDTOMapper from '../../../interfaces/mappers/maintenance.dto-mapper';
import MaintenanceRepositoryWriter from '../../../ports/repositories/writers/maintenance-repository-writer';
import CreateMaintenanceCommand from './create-maintenance.command';

export default class CreateMaintenanceCommandHandler {
  constructor(private readonly maintenanceRepositoryWriter: MaintenanceRepositoryWriter) {}

  async execute(createMaintenanceCommand: CreateMaintenanceCommand): Promise<MaintenanceDTO> {
    const { label, bikeId, lastMaintenanceDate, nextMaintenanceDate, maintenanceType } = createMaintenanceCommand.maintenancePayload;

    const maintenanceDTO = new MaintenanceDTO(null, label, bikeId, lastMaintenanceDate, nextMaintenanceDate, maintenanceType);
    const createdMaintenance = await this.maintenanceRepositoryWriter.create(maintenanceDTO);

    return MaintenanceDTOMapper.toDTO(createdMaintenance);
  }
}
