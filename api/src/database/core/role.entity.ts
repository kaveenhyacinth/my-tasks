import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';

export enum ROLE {
  BASE = 'base',
  ADMIN = 'admin',
}

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column({ enum: ['base', 'admin'] })
  roleName: ROLE;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
