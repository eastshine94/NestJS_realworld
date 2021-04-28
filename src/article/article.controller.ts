import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
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
  create(@Body() req: { article: Article }) {
    return this.articleService.create({ ...req.article });
  }

  @Put(':slug')
  update(@Param('slug') slug: string, @Body() req: { article: Article }) {
    return this.articleService.update(slug, { ...req.article });
  }

  @Delete(':slug')
  delete(@Param('slug') slug: string) {
    return this.articleService.remove(slug);
  }
}
