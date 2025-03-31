import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Department } from './department.entity';
import { Role } from './role.entity';
import { Task } from './task.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  employeeId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fcmToken: string;

  @ManyToOne(() => Department, (department) => department.users, {
    eager: true,
    onDelete: 'SET NULL',
  })
  department: Department;

  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  role: Role;

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];
}
