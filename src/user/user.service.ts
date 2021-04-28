import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<{ user: User }> {
    return this.userRepository.findOne(id).then(user => ({ user }));
  }

  async create(user): Promise<void> {
    try {
      await this.userRepository.insert(user);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async update(user: User): Promise<void> {
    try {
      await this.userRepository.update(user.username, user);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
