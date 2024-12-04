import { Customer } from '../../domain/entity/customer';

export default abstract class CustomerRepositoryReader {
  abstract all(): Customer[];
}
