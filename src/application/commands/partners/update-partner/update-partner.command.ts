import { Command } from '../../common/command';

export default class UpdatePartnerCommand implements Command {
  constructor(
    private readonly _partnerId: string,
    private readonly _partnerData: any,
  ) {}

  get partnerId(): string {
    return this._partnerId;
  }

  get partnerData(): any {
    return this._partnerData;
  }
}
