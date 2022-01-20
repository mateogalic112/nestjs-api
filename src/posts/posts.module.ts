import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search/search.module';
import Post from './post.entity';
import PostsController from './posts.controller';
import PostsService from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SearchModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
