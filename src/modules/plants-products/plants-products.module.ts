import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseModule } from 'src/database/database.module';
import { PlantsProductsService } from './services/plants-products.service';
import { PlantsProductsController } from './controllers/plants-products.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PlantsProductsController],
  providers: [
    {
      provide: 'PLANT_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('Plant'),
    },
    {
      provide: 'PRODUCT_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('Product'),
    },
    {
      provide: 'PLANT_PRODUCT_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('PlantProduct'),
    },
    PlantsProductsService,
  ],
})
export class PlantsProductsModule {}
