import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import GetUserByIdentifierQuery from '@triumph/application/queries/users/get-user-by-identifier/get-user-by-identifier.query';
import GetUserByIdentifierUseCase from '@triumph/application/queries/users/get-user-by-identifier/get-user-by-identifier.usecase';
import ListUsersQuery from '@triumph/application/queries/users/list-users/list-users.query';
import ListUsersUseCase from '@triumph/application/queries/users/list-users/list-users.usecase';

@Controller('users')
export default class UserReaderController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getUserByIdentifierUseCase: GetUserByIdentifierUseCase,
  ) {}

  @Get()
  async list(@Res() response: Response): Promise<Response> {
    const users = await this.listUsersUseCase.execute(new ListUsersQuery());
    return response.json(users);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    const getUserQuery = new GetUserByIdentifierQuery(id);

    try {
      const user = await this.getUserByIdentifierUseCase.execute(getUserQuery);
      return response.json(user);
    } catch (error) {
      return response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
