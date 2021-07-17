import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/@:username')
  async getUserByUsername(@Param('username') username: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  @Get('/:userid')
  getUserByUserid(@Param('userid') userid: string): string {
    return `details of user id = ${userid}`;
  }

  @Post('/')
  createNewUser(): string {
    return 'new user created';
  }

  @Patch('/:userid')
  updateUserDetails(@Param('userid') userid: string): string {
    return `details of user (id = ${userid}) updated`;
  }

  @Put('/:userid/follow')
  followUser(@Param('userid') userid: string): string {
    return `you followed user = ${userid}`;
  }

  @Delete('/:userid/follow')
  unfollowUser(@Param('userid') userid: string): string {
    return `you unfollowed user = ${userid}`;
  }

  @Get('/:userid/followers')
  getFollowersOfUser(@Param('userid') userid: string): string {
    return `get followers of user = ${userid}`;
  }

  @Put('/:userid/followees')
  getFolloweesOfUser(@Param('userid') userid: string): string {
    return `get followees of given user = ${userid}`;
  }
}
