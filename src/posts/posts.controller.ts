import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePostDto.dto';
import PostsService from './posts.service';
import { Post as UserPost } from './post.interface';
import { UpdatePostDto } from './dto/UpdatePostDto';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts(): UserPost[] {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string): UserPost {
    return this.postsService.getPostbyId(Number(id));
  }

  @Post()
  async createPost(@Body() post: CreatePostDto): Promise<UserPost> | never {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.replacePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
