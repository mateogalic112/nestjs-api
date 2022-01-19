import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { mockedCofnigService } from 'src/utils/mocks/cofnig.service';
import { mockedJwtService } from 'src/utils/mocks/jwt.service';
import { AuthenticationService } from '../authentication.service';

describe('Testing Auth service', () => {
  let authService: AuthenticationService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        UsersService,
        { provide: ConfigService, useValue: mockedCofnigService },
        { provide: JwtService, useValue: mockedJwtService },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();
    authService = await module.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(typeof authService.getCookieWithJwtToken(userId)).toEqual(
        'string',
      );
    });
  });
});
