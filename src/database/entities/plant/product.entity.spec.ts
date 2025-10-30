/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import Product from './product.entity';

describe('Product Entity', () => {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'mysql',
      database: 'test',
      username: 'root',
      password: '',
      logging: false,
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('debe inicializar con tabla y opciones correctas', () => {
    Product.initModel(sequelize);
    expect(Product.tableName).toBe('product');
    expect(Product.options.paranoid).toBe(true);
    expect(Product.options.timestamps).toBe(true);
  });

  it('debe definir índices esperados', () => {
    Product.initModel(sequelize);
    const names = (Product.options.indexes || []).map((i: any) => i.name);
    expect(names).toEqual(
      expect.arrayContaining(['idx_product_nursery', 'idx_product_deletedAt']),
    );
  });

  it('debe configurar asociaciones con Nursery, Plant (belongsToMany) y PlantProduct', () => {
    Product.initModel(sequelize);
    const belongsToSpy = jest
      .spyOn(Product as unknown as typeof Model, 'belongsTo')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const belongsToManySpy = jest
      .spyOn(Product as unknown as typeof Model, 'belongsToMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const hasManySpy = jest
      .spyOn(Product as unknown as typeof Model, 'hasMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);

    const fakeModels = {
      Nursery: Model as any,
      Plant: Model as any,
      PlantProduct: Model as any,
    };

    Product.associate(fakeModels as any);

    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Nursery, { foreignKey: 'nurseryId' });
    expect(belongsToManySpy).toHaveBeenCalledWith(fakeModels.Plant, {
      through: fakeModels.PlantProduct,
      foreignKey: 'productId',
      otherKey: 'plantId',
      as: 'plants',
    });
    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.PlantProduct, { foreignKey: 'productId' });
  });
});


