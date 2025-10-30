/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import Session from './session.entity';

jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(async () => 'salt'),
  hash: jest.fn(async () => 'hashed-token'),
}));

describe('Session Entity', () => {
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
    Session.initModel(sequelize);
    expect(Session.tableName).toBe('sessions');
    expect(Session.options.paranoid).toBe(true);
    expect(Session.options.timestamps).toBe(true);
  });

  it('debe definir índices esperados', () => {
    Session.initModel(sequelize);
    const idx = (Session.options.indexes || []).map((i: any) => i.name);
    expect(idx).toEqual(
      expect.arrayContaining([
        'uk_session_token',
        'idx_session_user',
        'idx_session_active',
        'idx_session_deletedAt',
      ]),
    );
  });

  it('debe configurar belongsTo con User y ejecutar beforeCreate', async () => {
    Session.initModel(sequelize);
    const belongsToSpy = jest
      .spyOn(Session as unknown as typeof Model, 'belongsTo')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const fakeModels = { User: Model as any };
    Session.associate(fakeModels as any);
    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.User, { foreignKey: 'userId' });

    const hooks = Session.options.hooks as any;
    const beforeCreate = Array.isArray(hooks.beforeCreate)
      ? hooks.beforeCreate[0]
      : hooks.beforeCreate;

    const mockSet = jest.fn();
    await beforeCreate({ set: mockSet } as any);
    expect(mockSet).toHaveBeenCalledWith('token', expect.any(String));
    expect(mockSet).toHaveBeenCalledWith('active', true);
    expect(mockSet).toHaveBeenCalledWith('meta', {});
  });
});


