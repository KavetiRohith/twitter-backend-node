import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get('/')
  getAllPosts(): string {
    return 'get all posts';
  }

  @Get(':postid')
  getPostdetails(@Param() param): string {
    return `details of post with id = ${param.postid}`;
  }

  @Post()
  createNewPost(): string {
    return 'new Post';
  }

  @Delete('/:postid')
  deletePost(@Param() param): string {
    return `deleted post with id = ${param.postid}`;
  }

  @Put('/:postid/like')
  likePost(@Param() param): string {
    return `liked post with id = ${param.postid}`;
  }

  @Delete('/:postid/like')
  unlikePost(@Param() param): string {
    return `unliked post with id = ${param.postid}`;
  }
}
