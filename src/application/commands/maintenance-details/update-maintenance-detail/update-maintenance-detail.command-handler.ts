import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import MaintenanceDetailDTOMapper from '../../../interfaces/mappers/maintenance-detail.dto-mapper';
import MaintenanceDetailRepositoryWriter from '../../../ports/repositories/writers/maintenance-detail-repository-writer';
import UpdateMaintenanceDetailCommand from './update-maintenance-detail.command';

export default class UpdateMaintenanceDetailCommandHandler {
  constructor(private readonly maintenanceDetailRepositoryWriter: MaintenanceDetailRepositoryWriter) {}

  async execute(updateMaintenanceDetailCommand: UpdateMaintenanceDetailCommand): Promise<MaintenanceDetailDTO> {
    const { maintenanceDetailId, maintenanceDetailPayload } = updateMaintenanceDetailCommand;
    const { maintenanceId, label, maintenanceType, sparePartId, price, comments } = maintenanceDetailPayload;

    const maintenanceDetailDTO = new MaintenanceDetailDTO(
      maintenanceDetailId,
      maintenanceId,
      label,
      maintenanceType,
      sparePartId,
      price,
      comments,
    );
    const updatedMaintenanceDetail = await this.maintenanceDetailRepositoryWriter.update(
      maintenanceDetailId,
      maintenanceDetailDTO,
    );

    return MaintenanceDetailDTOMapper.toDTO(updatedMaintenanceDetail);
  }
}
