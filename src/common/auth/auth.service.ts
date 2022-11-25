import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from 'src/common/auth/dto/signIn.dto';
import { User } from 'src/common/models/users.entity';
import { comparePassword, encodedPassword } from '../utils/bcrypt';
import { FindUserDto } from 'src/modules/users/dto/Find-user-with-email';
import { UserDto } from 'src/modules/users/dto/users.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  public async signUp(body: UserDto) {
    body.password = encodedPassword(body.password);
    const newUser = this.userRepo.create(body);
    return this.userRepo.save(newUser);
  }
  async signinLocal(dto: SignInCredentialsDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('User unfound');
    console.log('password', dto.password);
    console.log('hashedpassword', user);
    const matched = comparePassword(dto.password, user.password);
    if (!matched) throw new UnauthorizedException('incorrect password');
    return this.signUser(user.id, user.email, user.role);
  }

  signUser(userId: string, email: string, role: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      role: role,
    });
  }

  async validateUser(email: FindUserDto, role: string): Promise<any> {
    const user = await this.usersService.validateUser(email);
    if (user && user.role === role) {
      const { role, ...result } = user;
      console.log('result', result);

      return result;
    }
    return null;
  }
}
