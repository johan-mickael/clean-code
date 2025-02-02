import Driver from '@triumph/domain/entity/driver';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';

import DriverDTO from '../dtos/driver.dto';

export default class DriverDTOMapper {
  static toDTO(driverEntity: Driver): DriverDTO {
    return new DriverDTO(driverEntity.id, driverEntity.firstname, driverEntity.lastname, driverEntity.profilePicture);
  }

  static toEntity(driverDTO: DriverDTO): Driver {
    const { id, firstname, lastname, profilePicture } = driverDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new Driver(id, firstname, lastname, profilePicture);
  }
}
