import { Command } from '../../common/command';

export default class CreateBikeModelCommand implements Command {
  constructor(private readonly _bikePayload: any) {}

  get bikePayload(): any {
    return this._bikePayload;
  }
}
