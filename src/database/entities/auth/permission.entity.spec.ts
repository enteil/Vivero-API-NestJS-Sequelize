/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import Permission from './permission.entity';

describe('Permission Entity', () => {
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

  it('debe inicializar con configuración base correcta', () => {
    Permission.initModel(sequelize);
    expect(Permission.tableName).toBe('permission');
    expect(Permission.options.paranoid).toBe(true);
    expect(Permission.options.timestamps).toBe(true);
  });

  it('debe tener índice en deletedAt', () => {
    Permission.initModel(sequelize);
    const idx = (Permission.options.indexes || []).map((i: any) => i.name);
    expect(idx).toContain('idx_permission_deletedAt');
  });

  it('debe configurar belongsToMany con Role a través de RolePermission', () => {
    Permission.initModel(sequelize);
    const belongsToManySpy = jest
      .spyOn(Permission as unknown as typeof Model, 'belongsToMany')
      .mockImplementation(((..._args: any[]) => ({})) as any);

    const fakeModels = {
      Role: Model as any,
      RolePermission: Model as any,
    };

    Permission.associate(fakeModels as any);

    expect(belongsToManySpy).toHaveBeenCalledWith(fakeModels.Role, {
      through: fakeModels.RolePermission,
      foreignKey: 'permissionId',
      otherKey: 'roleId',
      as: 'roles',
    });
  });
});
