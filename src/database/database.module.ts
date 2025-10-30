// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { initModels } from './entities/init-models';

export const MODELS = 'MODELS';

@Module({
  providers: [
    {
      provide: MODELS,
      inject: [Sequelize],
      useFactory: async (sequelize: Sequelize) => {
        if (Object.keys(sequelize.models).length === 0) {
          void initModels(sequelize);
        }

        await sequelize.authenticate();
        return sequelize.models;
      },
    },
  ],
  exports: [MODELS],
})
export class DatabaseModule {}
