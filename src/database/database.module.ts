import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from 'src/categories/category.entity';
import PublicFile from 'src/files/entities/publicFile.entity';
import Post from 'src/posts/post.entity';
import Address from 'src/users/entities/address.entity';
import User from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Post, User, Address, Category, PublicFile],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
