import { TwitterBaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('sessions')
export class SessionsEntity extends TwitterBaseEntity {
  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => UserEntity)
  user: UserEntity;
}