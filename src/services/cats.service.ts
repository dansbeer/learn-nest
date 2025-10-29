import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CreateCatDto } from 'src/models/cats.model';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name)
    private readonly catModel: Model<Cat>,
  ) {}

  async create(catData: { name: string; age: number; breed: string }) {
    const newCat = new this.catModel(catData);
    return newCat.save();
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
