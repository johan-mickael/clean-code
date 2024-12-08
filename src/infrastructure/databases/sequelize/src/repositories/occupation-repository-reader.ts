import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationModel from '../models/occupation.model';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';

export default class SequelizeOccupationRepository implements OccupationRepositoryReader {
  async list(): Promise<Occupation[]> {
    const occupations = await OccupationModel.findAll();

    return occupations.map((occupation) => new Occupation(occupation.id, occupation.name));
  }
}
