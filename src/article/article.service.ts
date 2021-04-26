import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  findAll(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['user'] });
  }

  findOne(slug): Promise<Article> {
    return this.articleRepository.findOne(slug, {
      relations: ['user'],
      select: [
        'slug',
        'title',
        'body',
        'description',
        'favoriteCount',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async create(article: Article): Promise<void> {
    try {
      await this.articleRepository.insert({
        ...article,
        slug: article.title.toLowerCase().replace(/ /gi, '-'),
        user: { username: article.username },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
