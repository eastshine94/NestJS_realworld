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

  findAll(): Promise<{ articles: Article[] }> {
    return this.articleQueryBuilder.getMany().then(articles => ({
      articles: articles.map(article => this.getArticleApi(article))
    }));
  }

  findOne(slug): Promise<{ article: Article }> {
    return this.articleQueryBuilder
      .where({ slug })
      .getOne()
      .then(article => ({ article: this.getArticleApi(article) }));
  }

  async create(article: Article): Promise<boolean> {
    try {
      const tagList = await (article.tagList as Array<string>).map(tag => {
        const tagObj = new Tag();
        tagObj.name = tag;
        return tagObj;
      });

      const find = await this.articleRepository.findOne({
        title: article.title
      });
      if (find) {
        return false;
      }
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

  async update(slug: string, article: Article): Promise<boolean> {
    try {
      const tagList = await (article.tagList as Array<string>).map(tag => {
        const tagObj = new Tag();
        tagObj.name = tag;
        return tagObj;
      });

      const find = await this.articleRepository.findOne({ slug });

      if (!find) {
        return false;
      }
      await this.articleRepository.save({
        ...find,
        ...article,
        slug: article.title.toLowerCase().replace(/ /gi, '-'),
        tagList
      });
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove(slug: string): Promise<void> {
    await this.articleRepository.delete({ slug });
  }
}
