/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import City from './city.entity';

describe('City Entity', () => {
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
    City.initModel(sequelize);
    expect(City.tableName).toBe('cities');
    expect(City.options.paranoid).toBe(true);
    expect(City.options.timestamps).toBe(true);
  });

  it('debe tener índices definidos (stateId, deletedAt, unique name+state)', () => {
    City.initModel(sequelize);
    const names = (City.options.indexes || []).map((i: any) => i.name);
    expect(names).toEqual(
      expect.arrayContaining(['idx_city_state', 'idx_city_deletedAt', 'uk_city_name_state']),
    );
  });

  it('debe configurar belongsTo con State', () => {
    City.initModel(sequelize);
    const belongsToSpy = jest
      .spyOn(City as unknown as typeof Model, 'belongsTo')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const fakeModels = { State: Model as any };
    City.associate(fakeModels as any);
    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.State, { foreignKey: 'stateId' });
  });
});


