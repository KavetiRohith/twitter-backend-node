import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';
import { HashtagsController } from './hashtags/hashtags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/users.entity';
import { PostEntity } from './posts/posts.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { AuthModule } from './auth/auth.module';
import { PasswordEntity } from './auth/passwords.entity';
import { SessionsEntity } from './auth/sessions.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'twitteradmin',
      password: 'twitterpass',
      database: 'twitterdb',
      synchronize: true,
      dropSchema: true, // do not use in production
      logger: 'advanced-console',
      logging: 'all',
      entities: [UserEntity, PostEntity, PasswordEntity, SessionsEntity],
    }),
    UsersModule,
    PostsModule,
    HashtagsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
