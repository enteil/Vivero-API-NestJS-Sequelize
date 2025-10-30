import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { Sequelize } from 'sequelize-typescript';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'USER_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('User'),
    },
    {
      provide: 'SESSION_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('Session'),
    },
    {
      provide: 'ROLE_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('Role'),
    },
    {
      provide: 'ROLE_PERMISSION_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('RolePermission'),
    },
    {
      provide: 'PERMISSION_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('Permission'),
    },
    AuthService,
  ],
})
export class AuthModule {}
