import { TwitterBaseEntity } from '../common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends TwitterBaseEntity {
  @Column({ length: 30, nullable: false, unique: true })
  username: string;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ length: 240, nullable: true })
  bio?: string;

  @Column({ name: 'follower_count', default: 0 })
  followerCount: number;

  @Column({ name: 'followee_count', default: 0 })
  followeeCount: number;

  @Column('boolean', { default: false })
  verified: boolean;
}
