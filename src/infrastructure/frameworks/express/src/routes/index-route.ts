import bodyParser from 'body-parser';
import cors from 'cors';
import { Express, Router } from 'express';
import express from 'express';

import container from '../ioc/container.registry';

import BikeModelRoute from './bike-model-route';
import BikeRoute from './bike-route';
import PartnerRoute from './partner.route';
import DriverLicenseRoute from './driver-license-route';
import DriverRoute from './driver-route';
import DrivingHistoryRoute from './driving-history-route';
import DriverIncidentRoute from './driving-incident-route';
import RouteInterface from './route-interface';

export default class IndexRoute {
  bikeModelRoute: RouteInterface;
  bikeRoute: RouteInterface;
  partnerRoute: RouteInterface;
  driverLicenseRoute: RouteInterface;
  driverRoute: RouteInterface;
  drivingHistoryRoute: RouteInterface;
  driverIncidentRoute: RouteInterface;

  constructor() {
    const expressRouter = Router();

    this.bikeModelRoute = new BikeModelRoute();
    this.bikeRoute = new BikeRoute();
    this.partnerRoute = new PartnerRoute(
      container.resolve('PartnerController'),
      expressRouter,
    );
    this.driverLicenseRoute = new DriverLicenseRoute(
      container.resolve('DriverLicenseController'),
      expressRouter,
    );
    this.driverRoute = new DriverRoute(
      container.resolve('DriverController'),
      expressRouter,
    );
    this.drivingHistoryRoute = new DrivingHistoryRoute(
      container.resolve('DrivingHistoryController'),
      expressRouter,
    );
    this.driverIncidentRoute = new DriverIncidentRoute(
      container.resolve('DriverIncidentController'),
      expressRouter,
    );
  }

  configureRoutes(app: Express) {
    app.use(
      cors({
        origin: 'http://localhost:3030',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    );
    app.use(bodyParser.json());
    app.use(express.json());

    app.use('/bike-models', this.bikeModelRoute.getRouter());
    app.use('/bikes', this.bikeRoute.getRouter());
    app.use('/partners', this.partnerRoute.getRouter());
    app.use('/driver-licenses', this.driverLicenseRoute.getRouter());
    app.use('/drivers', this.driverRoute.getRouter());
    app.use('/driving-history', this.drivingHistoryRoute.getRouter());
    app.use('/driving-incidents', this.driverIncidentRoute.getRouter());
  }
}
