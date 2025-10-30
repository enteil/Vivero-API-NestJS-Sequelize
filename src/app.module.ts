import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { PlantsModule } from './modules/plants/plants.module';
import { ProductsModule } from './modules/products/products.module';
import { PlantsProductsModule } from './modules/plants-products/plants-products.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '3306'), 10),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASS', 'tu_password'),
        database: config.get<string>('DB_NAME', 'mi_base_de_datos'),
        logging: false,
        autoLoadModels: false,
        synchronize: true,
        models: [],
        define: { timestamps: true, paranoid: true, freezeTableName: true },
      }),
    }),

    DatabaseModule,
    UsersModule,
    PlantsModule,
    ProductsModule,
    PlantsProductsModule,
    AuthModule,
  ],
})
export class AppModule {}
