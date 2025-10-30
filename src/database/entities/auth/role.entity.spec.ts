/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import Role from './role.entity';

describe('Role Entity', () => {
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
    Role.initModel(sequelize);
    expect(Role.tableName).toBe('role');
    expect(Role.options.paranoid).toBe(true);
    expect(Role.options.timestamps).toBe(true);
  });

  it('debe definir índice de deletedAt', () => {
    Role.initModel(sequelize);
    const indexNames = (Role.options.indexes || []).map((i: any) => i.name);
    expect(indexNames).toContain('idx_role_deletedAt');
  });

  it('debe configurar asociaciones con User y Permission', () => {
    Role.initModel(sequelize);
    const hasManySpy = jest
      .spyOn(Role as unknown as typeof Model, 'hasMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);
    const belongsToManySpy = jest
      .spyOn(Role as unknown as typeof Model, 'belongsToMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);

    const fakeModels = {
      User: Model as any,
      Permission: Model as any,
      RolePermission: Model as any,
    };

    Role.associate(fakeModels as any);

    expect(hasManySpy).toHaveBeenCalledWith(fakeModels.User, { foreignKey: 'roleId' });
    expect(belongsToManySpy).toHaveBeenCalledWith(fakeModels.Permission, {
      through: fakeModels.RolePermission,
      foreignKey: 'roleId',
      otherKey: 'permissionId',
      as: 'permissions',
    });
  });
});


