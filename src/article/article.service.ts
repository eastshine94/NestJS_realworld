import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  private articleQueryBuilder = this.articleRepository
    .createQueryBuilder('article')
    .leftJoinAndSelect('article.author', 'user')
    .select([
      'article.slug',
      'article.title',
      'article.description',
      'article.createdAt',
      'article.updatedAt',
      'article.favoriteCount',
      'user.username',
      'user.bio',
      'user.image'
    ]);

  findAll(): Promise<Article[]> {
    return this.articleQueryBuilder.getMany();
  }

  findOne(slug): Promise<Article> {
    return this.articleQueryBuilder.where({ slug }).getOne();
  }

  async create(article: Article): Promise<void> {
    try {
      await this.articleRepository.insert({
        ...article,
        slug: article.title.toLowerCase().replace(/ /gi, '-'),
        author: { username: article.username }
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
