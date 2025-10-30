// src/database/models/init-models.ts
import type { Sequelize as SequelizeTS } from 'sequelize-typescript';

import Nursery from './plant/nursery.entity';
import Permission from './auth/permission.entity';
import Product from './plant/product.entity';
import Plant from './plant/plant.entity';
import PlantProduct from './plant/plant-product.entity';
import RolePermission from './auth/role-permission.entity';
import Role from './auth/role.entity';
import User from './auth/user.entity';
import City from './location/city.entity';
import State from './location/state.entity';
import Session from './auth/session.entity';

export type SequelizeLike = SequelizeTS;

export interface Models {
  Nursery: typeof Nursery;
  Permission: typeof Permission;
  Product: typeof Product;
  Plant: typeof Plant;
  PlantProduct: typeof PlantProduct;
  RolePermission: typeof RolePermission;
  Role: typeof Role;
  User: typeof User;
  City: typeof City;
  State: typeof State;
  Session: typeof Session;
}

export async function initModels(sequelize: SequelizeLike): Promise<Models> {
  Nursery.initModel(sequelize);
  Permission.initModel(sequelize);
  Product.initModel(sequelize);
  Plant.initModel(sequelize);
  PlantProduct.initModel(sequelize);
  Role.initModel(sequelize);
  RolePermission.initModel(sequelize);
  User.initModel(sequelize);
  City.initModel(sequelize);
  State.initModel(sequelize);
  Session.initModel(sequelize);

  const models: Models = {
    Nursery,
    Permission,
    Product,
    Plant,
    PlantProduct,
    RolePermission,
    Role,
    User,
    City,
    State,
    Session,
  };

  Object.values(models).forEach((modelClass) => {
    if (
      typeof modelClass === 'function' &&
      'associate' in modelClass &&
      typeof (modelClass as { associate?: (models: Models) => void })
        .associate === 'function'
    ) {
      (modelClass as { associate(models: Models): void }).associate(models);
    }
  });

  await sequelize.sync({ alter: true });

  return models;
}

export {
  Nursery,
  Permission,
  Product,
  Plant,
  PlantProduct,
  RolePermission,
  Role,
  User,
  City,
  State,
  Session,
};
