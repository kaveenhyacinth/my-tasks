import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartmentModule } from './modules/department/department.module';
import { UsernameExistConstraint } from './validators/username-exist.validator';
import { TaskModule } from './modules/task/task.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { JwtModule } from '@nestjs/jwt';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'cockroachdb',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/database/core/**/*.entity{.ts,.js}'],
        ssl: true,
      }),
    }),

    AuthModule,

    RoleModule,

    EmployeeModule,

    DepartmentModule,

    TaskModule,

    AnalyticsModule,

    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsernameExistConstraint],
})
export class AppModule {}
