import { Body, Controller, Post } from '@nestjs/common';
import { SignInCredentialsDto } from 'src/common/auth/dto/signIn.dto';
import { UserDto } from 'src/modules/users/dto/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signinLocal(@Body() dto: SignInCredentialsDto) {
    return this.authService.signinLocal(dto);
  }
  @Post('/register')
  signUp(@Body() body: UserDto) {
    this.authService.signUp(body);
  }
}
