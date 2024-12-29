import { Command } from './command';

export abstract class CommandValidator {
  abstract validateCommand(command: Command): void;
}
