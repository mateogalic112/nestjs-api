import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { mockedCofnigService } from 'src/utils/mocks/cofnig.service';
import { mockedJwtService } from 'src/utils/mocks/jwt.service';
import { AuthenticationService } from '../authentication.service';
import * as bcrypt from 'bcrypt';
import { mockedUser } from 'src/utils/mocks/user';

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let usersService: UsersService;

  let bcryptCompare: jest.Mock;
  let findUser: jest.Mock;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    findUser = jest.fn().mockResolvedValue(mockedUser);
    const usersRepository = {
      findOne: findUser,
    };

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedCofnigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    authenticationService = await module.get(AuthenticationService);
    usersService = await module.get(UsersService);
  });

  describe('when accessing the data of authenticating user', () => {
    it('should attempt to get a user by email', async () => {
      const getByEmailSpy = jest.spyOn(usersService, 'getByEmail');
      await authenticationService.getAuthenticatedUser(
        'user@email.com',
        'strongPassword',
      );
      expect(getByEmailSpy).toBeCalledTimes(1);
    });
    describe('and the provided password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(false);
      });
      it('should throw an error', async () => {
        await expect(
          authenticationService.getAuthenticatedUser(
            'user@email.com',
            'password123',
          ),
        ).rejects.toThrow();
      });
    });
  });
  describe('and the provided password is valid', () => {
    beforeEach(() => {
      bcryptCompare.mockReturnValue(true);
    });
    describe('and the user is found in the database', () => {
      beforeEach(() => {
        findUser.mockReturnValue(mockedUser);
      });
      it('should return the user data', async () => {
        const user = await authenticationService.getAuthenticatedUser(
          'user@email.com',
          'pass1234',
        );
        expect(user).toBe(mockedUser);
      });
    });
    describe('and the user is not found in the database', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          authenticationService.getAuthenticatedUser(
            'user@email.com',
            'strongPassword',
          ),
        ).rejects.toThrow();
      });
    });
  });
});
