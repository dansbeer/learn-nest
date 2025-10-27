import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CreateCatDto } from 'src/models/cats.model';
import { ResponseDto } from 'src/models/dto';
import { setMetadataResponse } from 'src/utils/response.util';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  @Post('add')
  @ApiOperation({ summary: 'Add Cat' })
  @ApiResponse({
    status: 200,
    description: 'Return Add Cats',
    type: ResponseDto,
  })
  async createCats(@Body() body: CreateCatDto, @Res() res: Response) {
    const startTime = Date.now();

    const response = setMetadataResponse(
      startTime,
      body,
      'success',
      HttpStatus.OK,
    );
    return res.status(HttpStatus.OK).json(response);
  }
}
