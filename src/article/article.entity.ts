import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  slug?: string;

  @Column({ unique: true })
  title!: string;

  @Column()
  description!: string;

  @Column()
  body!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({
    default: 0
  })
  favoriteCount?: number;

  @ManyToOne(() => User, user => user.articles, {
    onUpdate: 'CASCADE'
  })
  @JoinColumn({
    name: 'username'
  })
  author!: User;

  username: string;

  @ManyToMany(() => Tag, tags => tags.name, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'tagList',
    joinColumn: {
      name: 'article_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'name'
    }
  })
  tagList: Array<Tag | string>;
}
