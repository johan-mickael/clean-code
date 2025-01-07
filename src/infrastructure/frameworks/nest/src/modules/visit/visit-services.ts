import { Inject, Injectable } from '@nestjs/common';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import VisitRepositoryReader from '@triumph/application/ports/repositories/reader/visit-repository-reader';
import VisitRepositoryWriter from '@triumph/application/ports/repositories/writer/visit-repository-writer';
import CreateVisitCommand from '@triumph/application/queries/visit/add/create-visit-command';
import CreateVisitCommandHandler from '@triumph/application/queries/visit/add/create-visit-handler';
import SearchVisitQuery from '@triumph/application/queries/visit/filter/search-visit-query';
import SearchVisitQueryHandler from '@triumph/application/queries/visit/filter/search-visit-query-handler';

@Injectable()
export class VisitService {
  constructor(
    @Inject('VisitRepositoryWriter') private readonly visitRepositoryWriter: VisitRepositoryWriter,
    @Inject('VisitRepositoryReader') private readonly visitRepositoryReader: VisitRepositoryReader,
    @Inject('BikeRepositoryReader') private readonly bikeRepositoryReader: BikeRepositoryReader,
  ) {}

  async createVisit(bikeModelId: number, visitDate: Date, price: number, recapitulation: string) {
    const createVisitCommandHandler = new CreateVisitCommandHandler(
      this.visitRepositoryWriter,
      this.bikeRepositoryReader,
    );

    return await createVisitCommandHandler.execute(
      new CreateVisitCommand(bikeModelId, visitDate, price, recapitulation),
    );
  }

  async getVisitList() {
    return this.visitRepositoryReader.list();
  }

  async getVisitById(id: number) {
    return this.visitRepositoryReader.getById(id);
  }

  async searchVisits(keyword: string) {
    const searchVisitQueryHandler = new SearchVisitQueryHandler(this.visitRepositoryReader);
    return await searchVisitQueryHandler.execute(new SearchVisitQuery(keyword));
  }
}
