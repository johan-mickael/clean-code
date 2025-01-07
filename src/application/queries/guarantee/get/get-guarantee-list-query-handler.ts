import { Guarantee } from '@triumph/domain/entity/guarantee';

import GuaranteeRepositoryReader from '../../../ports/repositories/reader/guarantee-repository-reader';
import GetGuaranteeListQuery from './get-guarantee-list-query';

export default class GetGuaranteeListQueryHandler {
  constructor(private readonly guaranteeRepositoryReader: GuaranteeRepositoryReader) {}

  async execute(query: GetGuaranteeListQuery): Promise<Guarantee[]> {
    return await this.guaranteeRepositoryReader.list();
  }
}
