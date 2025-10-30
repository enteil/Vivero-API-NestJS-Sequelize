import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('User'),
    },
    UsersService,
  ],
})
export class UsersModule {}
