import { Command } from '../../common/command';

export default class UpdateBikeCommand implements Command {
  constructor(
    public readonly bikeId: string,
    public readonly bikePayload: any,
  ) {}
}
