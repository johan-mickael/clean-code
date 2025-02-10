import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import CheckAllDueMaintenancesForBikesUsecase from '@triumph/application/commands/check-due-maintenances-for-bike-daily-task/check-all-due-maintenances-for-bikes.usecase';

@Injectable()
export class CheckAllDueMaintenancesForBikesDailyTask implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(private readonly checkAllDueMaintenancesForBikesUsecase: CheckAllDueMaintenancesForBikesUsecase) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.checkAllDueMaintenancesForBikesUsecase.execute();
  }

  async onApplicationShutdown(): Promise<void> {}
}
