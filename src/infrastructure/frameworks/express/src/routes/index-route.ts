import express, { Express } from 'express';
import DealerRoute from './dealer-route';
import PartnerRoute from './partner-route';
import BikeModelRoute from './bike-model-route';

export default class Routes {
  constructor(
    private readonly bikeModelRoute: BikeModelRoute,
    private readonly dealerRoute: DealerRoute,
    private readonly partnerRoute: PartnerRoute,
  ) {}

  configureRoutes(app: Express) {
    const router = express.Router();

    router.use('/bike-models', this.bikeModelRoute.getRouter());
    router.use('/dealers', this.dealerRoute.getRouter());
    router.use('/partners', this.partnerRoute.getRouter());

    app.use(router);
  }
}
