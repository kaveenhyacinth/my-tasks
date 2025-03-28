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

  @ManyToOne(() => User, (user) => user.tasks)
  assignee: User;
}
