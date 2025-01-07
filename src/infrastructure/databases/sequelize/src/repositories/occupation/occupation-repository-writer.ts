import OccupationRepositoryWriter from '@triumph/application/ports/repositories/writer/occupation-repository-writer';
import { Occupation } from '@triumph/domain/entity/occupation';

import OccupationModel from '../../models/occupation.model';

export default class SequelizeOccupationRepositoryWriter implements OccupationRepositoryWriter {
  edit(occupation: Occupation): Promise<Occupation> {
    throw new Error('Method not implemented.');
  }
  delete(occupation: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async add(occupation: Occupation): Promise<Occupation> {
    try {
      const newOccupation = await OccupationModel.create({
        name: occupation.name,
      });

      return new Occupation(newOccupation.id, newOccupation.name);
    } catch (error) {
      console.error("Erreur lors de la création de l'occupation :", error);
      throw new Error("Erreur lors de la création de l'occupation");
    }
  }
}
