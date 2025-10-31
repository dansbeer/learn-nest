import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CreateCatDto } from '../models/cats.model';
import { ResponseDto } from '../models/dto';
import { CatsService } from '../services/cats.service';
import { setMetadataResponse } from '../utils/response.util';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add Cat' })
  @ApiResponse({
    status: 200,
    description: 'Return Add Cats',
    type: ResponseDto,
  })
  async createCats(@Body() body: CreateCatDto, @Res() res: Response) {
    const startTime = Date.now();

    await this.catsService.create(body);

    const response = setMetadataResponse(
      startTime,
      body,
      'success',
      HttpStatus.OK,
    );
    return res.status(HttpStatus.OK).json(response);
  }

  @Get('get-one/:id')
  @ApiOperation({ summary: 'Get One Cat' })
  @ApiResponse({
    status: 200,
    description: 'Get Data Cat',
    type: ResponseDto,
  })
  async getOneCat(@Query('id') id: string, @Res() res: Response) {
    const startTime = Date.now();

    // await this.catsService.create(body);

    const response = setMetadataResponse(
      startTime,
      {},
      'success',
      HttpStatus.OK,
    );
    return res.status(HttpStatus.OK).json(response);
  }
}
