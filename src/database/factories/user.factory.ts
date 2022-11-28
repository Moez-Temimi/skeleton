import { User } from 'src/common/models/users.entity';
import { UserDto } from 'src/modules/users/dto/users.dto';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(UserDto, (faker) => {
  const user = new UserDto();
  user.fullName = faker.name.firstName('male');
  user.phoneNumber = faker.phone.number();
  user.email = faker.internet.email();
  user.role = 'user';

  return user;
});
