import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { mockedCofnigService } from 'src/utils/mocks/cofnig.service';
import { mockedJwtService } from 'src/utils/mocks/jwt.service';
import { mockedUser } from 'src/utils/mocks/user.mock';
import { AuthenticationController } from '../authentication.controller';
import { AuthenticationService } from '../authentication.service';
import { plainToClass } from 'class-transformer';

describe('The AuthenticationController', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const usersRepository = {
      create: jest.fn().mockResolvedValue(plainToClass(User, mockedUser)),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
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
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('when registering with invalid data', () => {
    it('should throw an error', () => {
      return request(app.getHttpServer())
        .post('/authentication/register')
        .send({
          name: mockedUser.name,
        })
        .expect(400);
    });
  });
  describe('when registering with valid data', () => {
    it('should respond with the data of the user without the password', () => {
      return request(app.getHttpServer())
        .post('/authentication/register')
        .send({
          email: mockedUser.email,
          name: mockedUser.name,
          password: 'strongPassword',
        })
        .expect(201);
    });
  });
});
