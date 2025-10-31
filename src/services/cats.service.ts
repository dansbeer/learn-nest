import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CreateCatDto } from '../models/cats.model';
import * as crypto from 'crypto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name)
    private readonly catModel: Model<Cat>,
  ) {}

  async create(catData: CreateCatDto) {
    // generate id dari nama + umur + waktu
    const idSource = `${catData.name}-${catData.age}-${Date.now()}`;
    const customId = crypto.createHash('md5').update(idSource).digest('hex'); // hasil id unik

    const newCat = new this.catModel({
      _id: customId,
      ...catData,
    });

    return await newCat.save();
  }

  async findAll() {
    return await this.catModel.find().exec();
  }

  async findById(id: string) {
    return await this.catModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Cat>) {
    return await this.catModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.catModel.findByIdAndDelete(id).exec();
  }
}
