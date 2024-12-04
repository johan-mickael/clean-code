import { createContainer, asClass } from 'awilix';
import GetClientsQueryHandler from '../../../../../application/queries/get-clients-query-handler';
import InMemoryClientRepository from '../../../../../infrastructure/adapters/in-memory-database/client.repository-reader';
import ClientController from '../controllers/client.controller';

const container = createContainer();

container.register({
  clientRepositoryReader: asClass(InMemoryClientRepository).singleton(),
  getClientsQueryHandler: asClass(GetClientsQueryHandler).classic(),
  clientController: asClass(ClientController).classic(),
});

export default container;
