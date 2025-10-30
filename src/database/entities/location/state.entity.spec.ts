/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import State from './state.entity';

describe('State Entity', () => {
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
    State.initModel(sequelize);
    expect(State.tableName).toBe('states');
    expect(State.options.paranoid).toBe(true);
    expect(State.options.timestamps).toBe(true);
  });

  it('debe tener índices únicos en name y code', () => {
    State.initModel(sequelize);
    const indexes = (State.options.indexes || []).reduce((acc: any, i: any) => {
      acc[i.name] = i;
      return acc;
    }, {} as Record<string, any>);
    expect(indexes['uk_state_name']?.unique).toBe(true);
    expect(indexes['uk_state_code']?.unique).toBe(true);
  });

  it('debe configurar hasMany cities', () => {
    State.initModel(sequelize);
    const hasManySpy = jest
      .spyOn(State as unknown as typeof Model, 'hasMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const fakeModels = { City: Model as any };
    State.associate(fakeModels as any);
    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.City, {
      as: 'cities',
      foreignKey: 'stateId',
    });
  });
});


