import { Error as SequelizeError } from 'sequelize';

import PartnerDTO from '@triumph/application/interfaces/dtos/partner.dto';
import PartnerDTOMapper from '@triumph/application/interfaces/mappers/partner.dto-mapper';
import PartnerRepositoryWriter from '@triumph/application/ports/repositories/writers/partner.repository-writer';
import { Partner } from '@triumph/domain/entity/partner';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found.error';

import PartnerModel from '../../models/partner.model';

export default class SequelizePartnerRepositoryWriter implements PartnerRepositoryWriter {
  async create(partnerDTO: PartnerDTO): Promise<Partner> {
    const partnerModel = await PartnerModel.create({
      name: partnerDTO.name,
      email: partnerDTO.email,
      dealerId: partnerDTO.dealerId,
    });

    return PartnerDTOMapper.toEntity(partnerModel);
  }
  async update(id: string, partnerDTO: PartnerDTO): Promise<Partner> {
    try {
      const [affectedPartnerCount, updatedPartners] = await PartnerModel.update(
        {
          name: partnerDTO.name,
          email: partnerDTO.email,
          dealerId: partnerDTO.dealerId,
        },
        {
          where: {
            id,
          },
          returning: true,
        },
      );

      if (affectedPartnerCount === 0) {
        throw new PartnerNotFoundError();
      }

      const updatedPartner = updatedPartners[0];
      return PartnerDTOMapper.toEntity(updatedPartner);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new PartnerNotFoundError();
      }

      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const deletedPartnerCount = await PartnerModel.destroy({
        where: {
          id,
        },
      });

      if (deletedPartnerCount === 0) {
        throw new PartnerNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new PartnerNotFoundError();
      }

      throw error;
    }
  }
}
