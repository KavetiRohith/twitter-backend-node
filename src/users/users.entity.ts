import { TwitterBaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends TwitterBaseEntity {
  @Column({ length: 30, nullable: false, unique: true })
  username: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  avatar: string;

  @Column({ length: 240 })
  bio: string;

  @Column({ name: 'follower_count', default: 0 })
  followerCount: number;

  @Column({ name: 'followee_count', default: 0 })
  followeeCount: number;

  @Column('boolean', { default: false })
  verified: boolean;
}
