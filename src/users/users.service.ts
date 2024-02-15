import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOne(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = {
      username,
      password: await bcrypt.hash(password, 0),
      roles: ['user'],
      isActive: true,
    };

    return this.usersRepository.insert(user).then((result) => {
      return this.usersRepository.findOneBy({ id: result.identifiers[0].id });
    }) as Promise<User | undefined>;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username: username }) as Promise<
      User | undefined
    >;
  }
}
