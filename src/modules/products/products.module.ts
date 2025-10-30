import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsController } from './controllers/product.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'PRODUCT_MODEL',
      inject: [Sequelize],
      useFactory: (sequelize: Sequelize): typeof import('sequelize').Model =>
        sequelize.model('Product'),
    },
    ProductsService,
  ],
})
export class ProductsModule {}
