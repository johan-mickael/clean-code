import { Command } from '../../common/command';

export default class DeleteBikeCommand implements Command {
  constructor(public readonly bikeId: string) {}
}
