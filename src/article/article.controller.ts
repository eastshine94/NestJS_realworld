import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('api/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.articleService.findOne(slug);
  }

  @Post()
  create(@Body() req: { article: Article & { tagList: Array<string> } }) {
    return this.articleService.create({ ...req.article });
  }

  @Delete(':slug')
  delete(@Param('slug') slug: string) {
    return this.articleService.remove(slug);
  }
}
