import CreateCurativeMaintenanceForBikeConsumer from '@triumph/application/commands/create-curative-maintenance-for-bike/create-curative-maintenance-for-bike.consumer';
import CreatePreventiveMaintenanceForBikeModelConsumer from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.consumer';

export const CONSUMERS = [
  new CreatePreventiveMaintenanceForBikeModelConsumer(),
  new CreateCurativeMaintenanceForBikeConsumer(),
  // new MyConsumer(),
];
