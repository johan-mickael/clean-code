import { Response } from 'express';

import { Body, Controller, Post, Res } from '@nestjs/common';

import { OccupationService } from '../../modules/occupation/occupation-services';

@Controller('occupations')
export class OccupationControllerWriter {
  constructor(private readonly occupationService: OccupationService) {}

  @Post()
  async create(@Body() body: { name: string }, @Res() res: Response): Promise<Response> {
    const { name } = body;
    const occupation = await this.occupationService.create(name);
    return res.status(201).json(occupation);
  }
}
