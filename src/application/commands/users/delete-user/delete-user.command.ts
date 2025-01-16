import { Command } from '../../common/command';

export default class DeleteUserCommand implements Command {
  constructor(public readonly userId: string) {}
}
