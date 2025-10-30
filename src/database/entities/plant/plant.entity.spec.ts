/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import Plant from './plant.entity';

describe('Plant Entity', () => {
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
    Plant.initModel(sequelize);
    expect(Plant.tableName).toBe('plant');
    expect(Plant.options.paranoid).toBe(true);
    expect(Plant.options.timestamps).toBe(true);
  });

  it('debe definir índices esperados', () => {
    Plant.initModel(sequelize);
    const names = (Plant.options.indexes || []).map((i: any) => i.name);
    expect(names).toEqual(
      expect.arrayContaining(['idx_plant_nursery', 'idx_plant_deletedAt']),
    );
  });

  it('debe configurar asociaciones con Nursery, Product (belongsToMany) y PlantProduct', () => {
    Plant.initModel(sequelize);
    const belongsToSpy = jest
      .spyOn(Plant as unknown as typeof Model, 'belongsTo')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const belongsToManySpy = jest
      .spyOn(Plant as unknown as typeof Model, 'belongsToMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const hasManySpy = jest
      .spyOn(Plant as unknown as typeof Model, 'hasMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);

    const fakeModels = {
      Nursery: Model as any,
      Product: Model as any,
      PlantProduct: Model as any,
    };

    Plant.associate(fakeModels as any);

    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Nursery, { foreignKey: 'nurseryId' });
    expect(belongsToManySpy).toHaveBeenCalledWith(fakeModels.Product, {
      through: fakeModels.PlantProduct,
      foreignKey: 'plantId',
      otherKey: 'productId',
      as: 'products',
    });
    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.PlantProduct, { foreignKey: 'plantId' });
  });
});


