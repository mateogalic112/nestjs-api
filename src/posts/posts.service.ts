import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePostDto.dto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { Post } from './post.interface';

@Injectable()
export default class PostsService {
  private lastPostid = 1;
  private posts: Post[] = [{ id: 0, content: '', title: '' }];

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostbyId(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (post) {
      return post;
    }

    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  replacePost(id: number, post: UpdatePostDto): Post | never {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = post;
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  createPost(post: CreatePostDto): Post {
    const newPost = {
      id: ++this.lastPostid,
      ...post,
    };
    this.posts.push(newPost);
    return newPost;
  }

  deletePost(id: number): void {
    const postIndex = this.posts.findIndex((post) => post.id === id);

    if (postIndex > -1) {
      this.posts.slice(postIndex, 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
