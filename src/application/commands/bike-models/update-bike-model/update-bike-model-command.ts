import { Command } from '../../common/command';

export default class UpdateBikeModelCommand implements Command {
  constructor(
    private readonly _bikeModelId: string,
    private readonly _bikeModelData: any,
  ) {}

  get bikeModelId(): string {
    return this._bikeModelId;
  }

  get bikeModelData(): any {
    return this._bikeModelData;
  }
}
