import { Exclude } from 'class-transformer';
import PublicFile from 'src/files/entities/publicFile.entity';
import Post from 'src/posts/post.entity';

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from './address.entity';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address?: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => PublicFile, { eager: true, nullable: true })
  public avatar?: PublicFile;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;
}

export default User;
