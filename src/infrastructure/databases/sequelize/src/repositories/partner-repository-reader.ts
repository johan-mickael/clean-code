import { Partner } from '@triumph/domain/entity/partner';
import PartnerModel from '../models/partner.model';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/partner-repository-reader';

export default class SequelizePartnerRepository implements PartnerRepositoryReader {
  async list(): Promise<Partner[]> {
    const partners = await PartnerModel.findAll();

    return partners.map((partner) => new Partner(
      partner.id,
      partner.name,
      partner.email,
      partner.dealerId
    ));
  }

  async getById(id: string): Promise<Partner | null> {
    const partner = await PartnerModel.findByPk(id);

    if (!partner) {
      return null;
    }

    return new Partner(
      partner.id,
      partner.name,
      partner.email,
      partner.dealerId
    );
  }
}
