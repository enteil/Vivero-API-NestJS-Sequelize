import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { PlantsController } from './controllers/plants.controller';
import { PlantsService } from './services/plants.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PlantsController],
  providers: [
    {
      provide: 'PLANT_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('Plant'),
    },
    PlantsService,
  ],
})
export class PlantsModule {}
