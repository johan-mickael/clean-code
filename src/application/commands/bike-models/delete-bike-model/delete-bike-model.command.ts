import { Command } from '../../common/command';

export default class DeleteBikeModelCommand implements Command {
  constructor(private readonly _bikeModelId: string) {}

  get bikeModelId(): string {
    return this._bikeModelId;
  }
}
