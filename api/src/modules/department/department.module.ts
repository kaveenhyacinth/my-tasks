import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../../database/core/department.entity';
import { DepartmentController } from './department.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentService],
  exports: [DepartmentService],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
