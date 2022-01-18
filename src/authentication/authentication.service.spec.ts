import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthenticationService } from './authentication.service';

describe('Testing Auth service', () => {
  const authService = new AuthenticationService(
    new UsersService(new Repository<User>()),
    new JwtService({
      secretOrPrivateKey: 'Secret Key',
    }),
    new ConfigService(),
  );

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(typeof authService.getCookieWithJwtToken(userId)).toEqual(
        'string',
      );
    });
  });
});
