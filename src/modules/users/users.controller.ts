import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/common/auth/guard/role.guard';
import { Roles } from 'src/common/auth/dto/decorator/roles.decorator';
import { UserDto } from 'src/modules/users/dto/users.dto';
import { UsersService } from './users.service';
import { Role } from 'src/common/auth/enum/enum';
import FindOneParam from 'src/common/schemas/find-one-param';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(AuthGuard('jwtStrategy'), RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Roles(Role.ADMIN)
  @Post()
  addUser(@Body() body: UserDto) {
    this.service.addUser(body);
  }

  @Roles(Role.ADMIN)
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  getOneUser(@Param() id: FindOneParam) {
    return this.service.getOneUser(id);
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  updateUser(@Param() id: FindOneParam, @Body('body') body: UpdateUserDto) {
    return this.service.updateUser(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteBrand(@Param() id: FindOneParam) {
    return this.service.deleteUser(id);
  }
}
