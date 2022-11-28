import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FindOneParam from 'src/common/schemas/find-one-param';
import { encodedPassword } from 'src/common/utils/bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../common/models/users.entity';
import { FindUserDto } from '../../common/schemas/Find-user-with-email';
import { UpdateUserDto } from '../../common/schemas/update-user';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  addUser(body: Partial<User>) {
    body.password = encodedPassword(body.password);
    const newUser = this.userRepo.create(body);
    return this.userRepo.save(newUser);
  }

  getAll() {
    return this.userRepo.find({ select: ['fullName', 'email', 'role'] });
  }

  getOneUser(id: FindOneParam) {
    console.log(id);

    return this.userRepo.findOne({ where: { id: id.id } });
  }

  validateUser(email: FindUserDto) {
    return this.userRepo.findOne({ where: { email: email.email } });
  }

  updateUser(id: FindOneParam, body: UpdateUserDto) {
    if (body.password) body.password = encodedPassword(body.password);
    return this.userRepo.upsert(body, [id.id]);
  }

  deleteUser(id: FindOneParam) {
    return this.userRepo.delete(id);
  }
}
