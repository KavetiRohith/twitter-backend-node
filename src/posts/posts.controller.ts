import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  @Get('/')
  getAllPosts(): string {
    return 'get all posts';
  }

  @Get(':postid')
  getPostdetails(@Param('postid') postid: string): string {
    return `details of post with id = ${postid}`;
  }

  @Post()
  createNewPost(): string {
    return 'new Post';
  }

  @Delete('/:postid')
  deletePost(@Param('postid') postid: string): string {
    return `deleted post with id = ${postid}`;
  }

  @Put('/:postid/like')
  likePost(@Param('postid') postid: string): string {
    return `liked post with id = ${postid}`;
  }

  @Delete('/:postid/like')
  unlikePost(@Param('postid') postid: string): string {
    return `unliked post with id = ${postid}`;
  }
}
