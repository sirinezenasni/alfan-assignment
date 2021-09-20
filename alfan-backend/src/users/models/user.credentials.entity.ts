import { Entity, Index, ManyToOne, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'userCredentials' })
@Index(['type', 'user'], { unique: true })
@Index(['type', 'providerId'], { unique: true })
export class UserCredentials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.credentials)
  user: User;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  providerId: string;

  @Column({ type: 'varchar', length: 500 })
  accessToken: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  refreshToken: string;
}