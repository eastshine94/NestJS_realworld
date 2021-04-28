import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class Tag {
  @PrimaryColumn()
  name!: string;

  @ManyToMany(() => Article, articles => articles.id, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  articles: Article[];
}
