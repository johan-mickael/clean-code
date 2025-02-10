import Logger from '@triumph/application/ports/logger/logger.interface';

export default class ConsoleLogger implements Logger {
  info(message?: any, ...optionalParams: any[]): void {
    console.info(message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    console.error(message, ...optionalParams);
  }
}
