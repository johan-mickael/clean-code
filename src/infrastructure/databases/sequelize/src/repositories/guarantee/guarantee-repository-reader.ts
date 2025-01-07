import { Op } from 'sequelize';

import GuaranteeRepositoryReader from '@triumph/application/ports/repositories/reader/guarantee-repository-reader';
import { Guarantee } from '@triumph/domain/entity/guarantee';

import { toDomainGuarantee } from '../../../../../adapters/guarantee-adapter';
import GuaranteeModel from '../../models/guarantee.model';
import VisitModel from '../../models/visit.model';

export default class SequelizeGuaranteeRepositoryReader implements GuaranteeRepositoryReader {
  async list(): Promise<Guarantee[]> {
    const guarantees = await GuaranteeModel.findAll({
      include: [
        {
          model: VisitModel,
          as: 'visit',
        },
      ],
    });

    return guarantees.map((guarantee) => toDomainGuarantee(guarantee));
  }

  async getById(guaranteeId: number): Promise<Guarantee | null> {
    const guarantee = await GuaranteeModel.findByPk(guaranteeId, {
      include: ['visit'],
    });
    if (!guarantee) return null;

    return toDomainGuarantee(guarantee);
  }

  async search(keyword: string): Promise<Guarantee[]> {
    const guarantees = await GuaranteeModel.findAll({
      where: {
        type: { [Op.iLike]: `%${keyword}%` },
      },
      include: ['visit'],
    });

    return guarantees.map((guarantee) => toDomainGuarantee(guarantee));
  }
}
