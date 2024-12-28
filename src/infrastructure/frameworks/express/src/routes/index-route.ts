import { Express } from 'express';
import DealerRoute from './dealer-route';
import PartnerRoute from './partner-route';

export default class IndexRoute {
  constructor(
    private dealerRoute: DealerRoute,
    private partnerRoute: PartnerRoute,
  ) {}

  configureRoutes(app: Express) {
    app.use('/dealers', this.dealerRoute.getRouter());
    app.use('/partners', this.partnerRoute.getRouter());
  }
}
