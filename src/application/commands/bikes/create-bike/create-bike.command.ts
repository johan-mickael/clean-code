import { Command } from '../../common/command';

export default class CreateBikeCommand implements Command {
  constructor(public readonly bikePayload: any) {}
}
