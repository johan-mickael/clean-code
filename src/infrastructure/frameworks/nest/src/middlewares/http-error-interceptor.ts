import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { InvalidQueryError } from '@triumph/application/queries/common/invalid-query-error';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorInterceptor implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.debug(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof InvalidQueryError) {
      return response.sendStatus(HttpStatus.BAD_REQUEST);
    }

    return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
