/* eslint-disable */
/* eslint-env jest */
/// <reference types="jest" />
import { Sequelize, Model } from 'sequelize';
import RolePermission from './role-permission.entity';

describe('RolePermission Entity', () => {
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
    RolePermission.initModel(sequelize);
    expect(RolePermission.tableName).toBe('role_permission');
    expect(RolePermission.options.paranoid).toBe(true);
    expect(RolePermission.options.timestamps).toBe(true);
  });

  it('debe definir índices en permissionId y deletedAt', () => {
    RolePermission.initModel(sequelize);
    const names = (RolePermission.options.indexes || []).map((i: any) => i.name);
    expect(names).toContain('idx_roleperm_permission');
    expect(names).toContain('idx_roleperm_deletedAt');
  });

  it('debe configurar belongsTo con Role y Permission', () => {
    RolePermission.initModel(sequelize);
    const belongsToSpy = jest
      .spyOn(RolePermission as unknown as typeof Model, 'belongsTo')
      .mockImplementation(((..._args: any[]) => ({})) as any);

    const fakeModels = {
      Role: Model as any,
      Permission: Model as any,
    };

    RolePermission.associate(fakeModels as any);

    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Role, { foreignKey: 'roleId' });
    expect(belongsToSpy).toHaveBeenCalledWith(fakeModels.Permission, { foreignKey: 'permissionId' });
  });
});


