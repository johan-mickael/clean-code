import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import MaintenanceDetailDTOMapper from '../../../interfaces/mappers/maintenance-detail.dto-mapper';
import MaintenanceDetailRepositoryWriter from '../../../ports/repositories/writers/maintenance-detail-repository-writer';
import CreateMaintenanceDetailCommand from './create-maintenance-detail.command';

export default class CreateMaintenanceDetailCommandHandler {
  constructor(private readonly maintenanceDetailRepositoryWriter: MaintenanceDetailRepositoryWriter) {}

  async execute(createMaintenanceDetailCommand: CreateMaintenanceDetailCommand): Promise<MaintenanceDetailDTO> {
    const { maintenanceId, label, maintenanceType, sparePartId, price, comments } =
      createMaintenanceDetailCommand.maintenanceDetailPayload;

    const maintenanceDetailDTO = new MaintenanceDetailDTO(
      null,
      maintenanceId,
      label,
      maintenanceType,
      sparePartId,
      price,
      comments,
    );
    const createdMaintenanceDetail = await this.maintenanceDetailRepositoryWriter.create(maintenanceDetailDTO);

    return MaintenanceDetailDTOMapper.toDTO(createdMaintenanceDetail);
  }
}
