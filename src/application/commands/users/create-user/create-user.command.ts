import { Command } from '../../common/command';

export default class CreateUserCommand implements Command {
  constructor(public readonly userPayload: any) {}
}
