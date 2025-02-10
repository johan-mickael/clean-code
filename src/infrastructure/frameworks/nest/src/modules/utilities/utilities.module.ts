import { Module } from '@nestjs/common';
import Logger from '@triumph/application/ports/logger/logger.interface';
import ConsoleLogger from '@triumph/shared-infrastructure/loggers/console';

const LoggerProvider = {
  provide: Logger,
  useClass: ConsoleLogger,
};

@Module({
  imports: [],
  providers: [LoggerProvider],
  exports: [LoggerProvider],
})
export class UtilitiesModule {}
