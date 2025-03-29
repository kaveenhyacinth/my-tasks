import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ enum: [1, 2, 3] })
  priority: number;

  @Column({ type: 'timestamptz' })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.tasks, {
    eager: true,
    onDelete: 'CASCADE',
  })
  assignee: User;
}
