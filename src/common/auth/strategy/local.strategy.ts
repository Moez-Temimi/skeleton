import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FindUserDto } from 'src/common/schemas/Find-user-with-email';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: FindUserDto, role: string): Promise<any> {
    const user = await this.authService.validateUser(email, role);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
