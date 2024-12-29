import { Command } from './command';

export class InvalidCommandError extends Error {
  constructor(command?: Command | null) {
    super(`Invalid command provided: ${JSON.stringify(command)}`);
    Object.setPrototypeOf(this, InvalidCommandError.prototype);
  }
}
