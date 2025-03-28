import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'departments' })
export class Department extends BaseEntity {
  @Column()
  departmentName: string;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
