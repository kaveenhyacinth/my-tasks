import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ROLE } from '../../enums/role.enum';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column({ enum: ['base', 'admin'], unique: true })
  roleName: ROLE;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
