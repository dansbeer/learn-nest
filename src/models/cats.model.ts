import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCatDto {
  @ApiProperty({ example: 'Milo', description: 'Nama kucing' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 3, description: 'Umur kucing (tahun)' })
  @IsInt()
  age: number;

  @ApiProperty({ example: 'Persian', description: 'Jenis kucing', required: false })
  @IsOptional()
  @IsString()
  breed?: string;
}
