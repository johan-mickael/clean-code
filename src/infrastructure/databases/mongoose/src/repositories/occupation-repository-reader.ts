import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationModel from '../models/occupation.model';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import ObjectIdValidator from '../validators/objectid-validator';

export default class MongooseOccupationRepository implements OccupationRepositoryReader {
  async list(): Promise<Occupation[]> {
    const occupations = await OccupationModel.find({});

    return occupations.map((occupation) => new Occupation(occupation.id, occupation.name));
  }

  async getById(id: string): Promise<Occupation | null> {
    if (!ObjectIdValidator.isValid(id)) {
      return null;
    }

    const occupation = await OccupationModel.findById(id);

    if (!occupation) {
      return null;
    }

    return new Occupation(occupation.id, occupation.name);
  }

  async searchByName(keyword: string): Promise<Occupation[]> {
    const insensitiveKeywordOption = {
      $regex: keyword,
      $options: 'i', // case-insensitive
    };

    const occupations = await OccupationModel.find({
      name: insensitiveKeywordOption,
    });

    return occupations.map((occupation) => new Occupation(occupation.id, occupation.name));
  }
}
