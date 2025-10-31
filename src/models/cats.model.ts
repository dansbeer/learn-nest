import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export class CreateCatDto {
  @ApiProperty({ example: 'Milo', description: 'Nama kucing' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 3, description: 'Umur kucing (tahun)' })
  @IsInt()
  age: number;

  @ApiProperty({
    example: 'Persian',
    description: 'Jenis kucing',
    required: false,
  })
  @IsOptional()
  @IsString()
  breed?: string;
}

@Schema({
  collection: 'cats',
  timestamps: true,
  versionKey: false,
})
export class Cat extends Document {
  @Prop({
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  })
  declare _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
