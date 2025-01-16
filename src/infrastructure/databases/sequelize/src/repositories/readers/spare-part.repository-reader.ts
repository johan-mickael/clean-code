import { Error as SequelizeError } from 'sequelize';

import SparePartRepositoryReader from '@triumph/application/ports/repositories/readers/spare-part-repository-reader';
import SparePart from '@triumph/domain/entity/spare-part';

import SparePartModel from '../../models/spare-part.model';

export default class SequelizeSparePartRepository implements SparePartRepositoryReader {
  async list(): Promise<SparePart[]> {
    const spareParts = await SparePartModel.findAll();

    return spareParts.map(
      (part) => new SparePart(part.id, part.name, part.price, part.quantity),
    );
  }

  async getById(id: string): Promise<SparePart | null> {
    try {
      const part = await SparePartModel.findByPk(id);

      if (!part) {
        return null;
      }

      return new SparePart(part.id, part.name, part.price, part.quantity);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
