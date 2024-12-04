import ClientRepositoryReader from '../../../application/ports/client-repository-reader';
import { Client } from '../../../domain/entity/Client';
import { Permis } from '../../../domain/entity/Permis';
import { Profession } from '../../../domain/entity/Profession';

export default class InMemoryClientRepository
  implements ClientRepositoryReader
{
  private clients: Client[] = [];

  constructor() {
    const client_1 = new Client(
      1,
      new Permis(1, new Date(), 'VALID', 'US'),
      new Profession(1, 'Software Engineer'),
      'Doe',
      'John',
      'john@email.com',
      '123 Main St',
    );

    const client_2 = new Client(
      2,
      new Permis(2, new Date(), 'EXPIRED', 'CA'),
      new Profession(2, 'Doctor'),
      'Doe',
      'Jane',
      'jane@email.com',
      '123 Main St',
    );

    this.clients.push(client_1);
    this.clients.push(client_2);
  }

  all(): Client[] {
    return this.clients;
  }
}
