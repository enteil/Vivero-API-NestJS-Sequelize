/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import Nursery from './nursery.entity';

describe('Nursery Entity', () => {
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
    Nursery.initModel(sequelize);
    expect(Nursery.tableName).toBe('nursery');
    expect(Nursery.options.paranoid).toBe(true);
    expect(Nursery.options.timestamps).toBe(true);
  });

  it('debe definir índices esperados', () => {
    Nursery.initModel(sequelize);
    const names = (Nursery.options.indexes || []).map((i: any) => i.name);
    expect(names).toEqual(expect.arrayContaining(['idx_nursery_user', 'idx_nursery_deletedAt']));
  });

  it('debe configurar asociaciones con User, Plant, Product y PlantProduct', () => {
    Nursery.initModel(sequelize);
    const belongsToSpy = jest
      .spyOn(Nursery as unknown as typeof Model, 'belongsTo')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const hasManySpy = jest
      .spyOn(Nursery as unknown as typeof Model, 'hasMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);

    const fakeModels = {
      User: Model as any,
      Plant: Model as any,
      Product: Model as any,
      PlantProduct: Model as any,
    };

    Nursery.associate(fakeModels as any);

    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.User, { as: 'owner', foreignKey: 'userId' });
    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.Plant, { foreignKey: 'nurseryId' });
    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.Product, { foreignKey: 'nurseryId' });
    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.User, { as: 'users', foreignKey: 'nurseryId' });
    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.PlantProduct, { foreignKey: 'nurseryId' });
  });
});


