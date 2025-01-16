import { Command } from '../../common/command';

export default class UpdateUserCommand implements Command {
  constructor(
    public readonly userId: string,
    public readonly userPayload: any,
  ) {}
}
