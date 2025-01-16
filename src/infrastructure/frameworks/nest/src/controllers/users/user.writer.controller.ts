import { Controller, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import CreateUserCommand from '@triumph/application/commands/users/create-user/create-user.command';
import CreateUserUseCase from '@triumph/application/commands/users/create-user/create-user.usecase';
import UpdateUserCommand from '@triumph/application/commands/users/update-user/update-user.command';
import UpdateUserUseCase from '@triumph/application/commands/users/update-user/update-user.usecase';
import DeleteUserCommand from '@triumph/application/commands/users/delete-user/delete-user.command';
import DeleteUserUseCase from '@triumph/application/commands/users/delete-user/delete-user.usecase';

@Controller('users')
export default class UserWriterController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(@Body() userPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const createUserCommand = new CreateUserCommand(userPayload);
    const createdUser = await this.createUserUseCase.execute(createUserCommand);
    return response.status(HttpStatus.CREATED).json(createdUser);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userPayload: Record<string, unknown>, @Res() response: Response): Promise<Response> {
    const updateUserCommand = new UpdateUserCommand(id, userPayload);
    const updatedUser = await this.updateUserUseCase.execute(updateUserCommand);
    return response.json(updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') userId: string, @Res() response: Response): Promise<Response> {
    const deleteUserCommand = new DeleteUserCommand(userId);
    await this.deleteUserUseCase.execute(deleteUserCommand);
    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
