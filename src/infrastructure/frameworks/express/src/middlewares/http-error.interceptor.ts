import { NextFunction, Request, Response } from 'express';

import { InvalidCommandError } from '@triumph/application/commands/common/invalid-command.error';
import { InvalidQueryError } from '@triumph/application/queries/common/invalid-query.error';

export class HttpErrorInterceptor {
  static handle(error: any, request: Request, response: Response, next: NextFunction): any {
    // Debug the error
    console.debug(error);

    if (error instanceof InvalidQueryError || error instanceof InvalidCommandError) {
      // BAD REQUEST
      return response.sendStatus(400);
    }

    // Internal Server Error
    // Let's try to not reach this line of code ...
    return response.sendStatus(500);
  }
}
