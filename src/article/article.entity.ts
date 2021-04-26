import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Article {
  @PrimaryColumn()
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

  @ManyToOne(() => User, user => user.articles, { nullable: true })
  @JoinColumn({
    name: 'username'
  })
  author!: User;

  username: string;
}
