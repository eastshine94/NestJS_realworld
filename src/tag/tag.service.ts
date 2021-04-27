import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  findAll(): Promise<{ tags: string[] }> {
    return this.tagRepository
      .find()
      .then(tags => ({ tags: tags.map(tag => tag.name) }));
  }
}
