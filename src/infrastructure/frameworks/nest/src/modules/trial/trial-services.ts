import { Inject, Injectable } from '@nestjs/common';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import TrialRepositoryReader from '@triumph/application/ports/repositories/reader/trial-repository-reader';
import TrialRepositoryWriter from '@triumph/application/ports/repositories/writer/trial-repository-writer';
import CreateTrialCommand from '@triumph/application/queries/trial/add/create-trial-command';
import { Trial } from '@triumph/domain/entity/trial';

@Injectable()
export class TrialService {
  constructor(
    @Inject('TrialRepositoryWriter') private readonly trialRepositoryWriter: TrialRepositoryWriter,
    @Inject('TrialRepositoryReader') private readonly trialRepositoryReader: TrialRepositoryReader,
    @Inject('BikeRepositoryReader') private readonly bikeRepositoryReader: BikeRepositoryReader,
  ) {}

  async createTrial({ bikeId, startDate, endDate, kilometers }: CreateTrialCommand): Promise<Trial> {
    const bike = await this.bikeRepositoryReader.getById(bikeId);
    if (!bike) {
      throw new Error(`Bike with ID ${bikeId} not found.`);
    }

    const trial = new Trial(0, bike, startDate, endDate, kilometers);
    return this.trialRepositoryWriter.add(trial);
  }

  async listTrials(): Promise<Trial[] | null> {
    return this.trialRepositoryReader.list();
  }

  async getTrialById(id: number): Promise<Trial | null> {
    return this.trialRepositoryReader.getById(id);
  }

  async searchTrials(keyword: string): Promise<Trial[]> {
    return this.trialRepositoryReader.search(keyword);
  }
}
