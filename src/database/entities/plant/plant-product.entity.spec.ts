/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import PlantProduct from './plant-product.entity';

describe('PlantProduct Entity', () => {
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
    PlantProduct.initModel(sequelize);
    expect(PlantProduct.tableName).toBe('plant_product');
    expect(PlantProduct.options.paranoid).toBe(true);
    expect(PlantProduct.options.timestamps).toBe(true);
  });

  it('debe definir índices esperados', () => {
    PlantProduct.initModel(sequelize);
    const names = (PlantProduct.options.indexes || []).map((i: any) => i.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'idx_pp_plant',
        'idx_pp_product',
        'idx_pp_nursery',
        'idx_pp_deletedAt',
      ]),
    );
  });

  it('debe configurar belongsTo con Plant, Product y Nursery', () => {
    PlantProduct.initModel(sequelize);
    const belongsToSpy = jest
      .spyOn(PlantProduct as unknown as typeof Model, 'belongsTo')
      .mockImplementation(((..._args: any[]) => ({})) as any);

    const fakeModels = {
      Plant: Model as any,
      Product: Model as any,
      Nursery: Model as any,
    };

    PlantProduct.associate(fakeModels as any);

    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Plant, { foreignKey: 'plantId' });
    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Product, { foreignKey: 'productId' });
    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Nursery, { foreignKey: 'nurseryId' });
  });
});


