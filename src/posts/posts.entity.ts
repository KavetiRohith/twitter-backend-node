import { TwitterBaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('posts')
export class PostEntity extends TwitterBaseEntity {
  @Column({ length: 240, nullable: true })
  text: string;

  @Column('json', { default: [] })
  images: Array<string>;

  @Column({ name: 'like_count', default: 0 })
  likeCount: number;

  @Column({ name: 'retweet_count', default: 0 })
  retweetCount: number;

  @Column('json', { default: [] })
  hashtags: Array<string>;

  @Column('json', { default: [] })
  mentions: Array<Mention>;

  @OneToOne(() => PostEntity)
  @JoinColumn({ name: 'orig_post_id' })
  origPost: PostEntity;

  @OneToOne(() => PostEntity)
  @JoinColumn({ name: 'reply_to_post_id' })
  replyToPost: PostEntity;
}

class Mention {
  name: string;
  id: string;
}
