import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CreateCatDto } from '../models/cats.model';
import * as crypto from 'crypto';
import { RedisService } from '../connections/redis';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name)
    private readonly catModel: Model<Cat>,
    private readonly redisService: RedisService,
  ) {}

  async findById(id: string) {
    const cacheKey = `cat_id:${id}`;

    // cek cache dulu
    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      console.log('✅ Cached Get One Cat');
      return JSON.parse(cached);
    }

    console.log('❌ Cache miss Get One Cat');
    const cat = await this.catModel.findById(id).exec();

    if (!cat) {
      console.log(`⚠️ Cat with id ${id} not found`);
      return null;
    }

    const catJson = cat.toJSON();

    // simpan ke Redis db 3
    await this.redisService.set(cacheKey, catJson, 300); // TTL 5 menit
    return catJson;
  }

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

  async update(id: string, data: Partial<Cat>) {
    return await this.catModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.catModel.findByIdAndDelete(id).exec();
  }
}
