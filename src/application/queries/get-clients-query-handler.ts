import { Client } from '../../domain/entity/Client';
import ClientRepositoryReader from '../ports/client-repository-reader';
import GetClientsQuery from './get-clients-query';

export default class GetClientsQueryHandler {
  constructor(
    private readonly clientRepositoryReader: ClientRepositoryReader,
  ) {}

  execute(query: GetClientsQuery): Client[] {
    return this.clientRepositoryReader.all();
  }
}
