import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationModel from '../models/occupation.model';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import { Op } from 'sequelize';

export default class SequelizeOccupationRepository implements OccupationRepositoryReader {
  async list(): Promise<Occupation[]> {
    const occupations = await OccupationModel.findAll();

    return occupations.map((occupation) => new Occupation(occupation.id, occupation.name));
  }

  async getById(id: string): Promise<Occupation | null> {
    if (isNaN(Number(id))) {
      return null;
    }

    const occupation = await OccupationModel.findByPk(id);

    if (!occupation) {
      return null;
    }

    return new Occupation(occupation.id, occupation.name);
  }

  async searchByName(keyword: string): Promise<Occupation[]> {
    const occupations = await OccupationModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    });

    return occupations.map((occupation) => new Occupation(occupation.id, occupation.name));
  }
}
