import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { InvalidCommandError } from '@triumph/application/commands/common/invalid-command-error';
import { InvalidQueryError } from '@triumph/application/queries/common/invalid-query-error';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorInterceptor implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.debug(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof InvalidQueryError || exception instanceof InvalidCommandError) {
      return response.sendStatus(HttpStatus.BAD_REQUEST);
    }

    return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
