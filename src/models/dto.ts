import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 200 })
  code: number;

  @ApiProperty({ example: '15ms' })
  executionTime?: string;
}

export class ResponseDto<T = any> {
  @ApiProperty({ type: MetadataDto })
  metadata: MetadataDto;

  @ApiProperty({ type: 'object', additionalProperties: true })
  data: T;

  constructor(data: T, status = 'success', code = 200, executionTime?: string) {
    this.data = data;
    this.metadata = { status, code, executionTime };
  }
}
