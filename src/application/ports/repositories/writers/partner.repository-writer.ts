import { Partner } from '@triumph/domain/entity/partner';

import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class PartnerRepositoryWriter extends BaseRepositoryWriter<Partner, PartnerDTO> {}
