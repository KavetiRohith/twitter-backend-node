import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

export class UserCreateRequestBody {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiPropertyOptional() name?: string;
  @ApiPropertyOptional() avatar?: string;
  @ApiPropertyOptional() bio?: string;
}
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/@:username')
  async getUserByUsername(@Param('username') username: string): Promise<UserEntity> {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  @Get('/:userid')
  async getUserByUserid(@Param('userid') userid: string): Promise<UserEntity> {
    const user = await this.usersService.getUserByUserId(userid);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  @Post('/')
  async createNewUser(
    @Body() createNewUserRequest: UserCreateRequestBody,
  ): Promise<UserEntity> {
    const user = await this.usersService.createUser(createNewUserRequest);
    return user;
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
