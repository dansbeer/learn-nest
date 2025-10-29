import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CreateCatDto } from 'src/models/cats.model';
import { ResponseDto } from 'src/models/dto';
import { CatsService } from 'src/services/cats.service';
import { setMetadataResponse } from 'src/utils/response.util';

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
  async createCats(
    @Body() body: { name: string; age: number; breed: string },
    @Res() res: Response,
  ) {
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
}
