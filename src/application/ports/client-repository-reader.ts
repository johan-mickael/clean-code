import { Client } from '../../domain/entity/Client';

export default abstract class ClientRepositoryReader {
  abstract all(): Client[];
}
