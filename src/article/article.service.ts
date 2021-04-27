import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  private articleQueryBuilder = this.articleRepository
    .createQueryBuilder('article')
    .leftJoinAndSelect('article.tagList', 'tagList')
    .leftJoinAndSelect('article.author', 'user')
    .select([
      'article.slug',
      'article.title',
      'article.description',
      'article.createdAt',
      'article.updatedAt',
      'article.favoriteCount',
      'tagList',
      'user.username',
      'user.bio',
      'user.image'
    ]);
  private getArticleApi = (article: Article) => {
    const tagList: Array<string> =
      article.tagList.reduce(
        (acc, curr: Tag) => [...acc, curr.name],
        [] as Array<string>
      ) || [];
    return { ...article, tagList };
  };

  findAll(): Promise<Article[]> {
    return this.articleQueryBuilder.getMany().then(articles => {
      return articles.map(article => this.getArticleApi(article));
    });
  }

  findOne(slug): Promise<Article> {
    return this.articleQueryBuilder
      .where({ slug })
      .getOne()
      .then(article => this.getArticleApi(article));
  }

  async create(article: Article): Promise<void> {
    try {
      const tagList = await (article.tagList as Array<string>).map(tag => {
        const tagObj = new Tag();
        tagObj.name = tag;
        return tagObj;
      });

      await this.articleRepository.save({
        ...article,
        slug: article.title.toLowerCase().replace(/ /gi, '-'),
        author: { username: article.username },
        tagList
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
