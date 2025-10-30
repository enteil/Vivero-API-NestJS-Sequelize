/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import User from './user.entity';

jest.mock('../../../helpers/bcrypt.helper', () => ({
  hashIfNeeded: jest.fn(async (val: string) => `hashed:${val}`),
}));

describe('User Entity', () => {
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

  it('debe inicializar con la configuración correcta (tabla, timestamps, paranoid)', () => {
    User.initModel(sequelize);
    expect(User.tableName).toBe('user');
    expect(User.options.timestamps).toBe(true);
    expect(User.options.paranoid).toBe(true);
    expect(User.getTableName()).toBe('user');
  });

  it('debe excluir password en el defaultScope', () => {
    User.initModel(sequelize);
    const defaultAttributes = (User.options.defaultScope as any)?.attributes;
    expect(defaultAttributes).toBeDefined();
    expect(defaultAttributes.exclude).toContain('password');
  });

  it('debe definir asociaciones belongsTo y hasMany correctamente', () => {
    User.initModel(sequelize);
    const belongsToSpy = jest
      .spyOn(User as unknown as typeof Model, 'belongsTo')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const hasManySpy = jest
      .spyOn(User as unknown as typeof Model, 'hasMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);

    const fakeModels = {
      Role: Model as any,
      Nursery: Model as any,
    };

    User.associate(fakeModels as any);

    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Role, {
      foreignKey: 'roleId',
    });
    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Nursery, {
      foreignKey: 'nurseryId',
    });
    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.Nursery, {
      as: 'ownedNurseries',
      foreignKey: 'userId',
    });
  });

  it('debe hashear el password en el hook beforeSave', async () => {
    User.initModel(sequelize);
    const hooks = User.options.hooks as any;
    expect(hooks).toBeDefined();

    const beforeSave = Array.isArray(hooks.beforeSave)
      ? hooks.beforeSave[0]
      : hooks.beforeSave;

    const mockUser: any = {
      isNewRecord: true,
      changed: (field: string) => field === 'password',
      password: 'plain',
    };

    await beforeSave(mockUser);
    expect(mockUser.password).toBe('hashed:plain');
  });
});
