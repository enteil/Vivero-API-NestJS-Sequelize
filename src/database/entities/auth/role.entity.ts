import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Role extends Model {
  static initModel(sequelize: Sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: 'uk_role_name',
        },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'role',
        modelName: 'Role',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [{ name: 'idx_role_deletedAt', fields: ['deletedAt'] }],
      },
    );
    return Role;
  }

  static associate(models: {
    User: typeof Model & { new (): Model };
    Permission: typeof Model & { new (): Model };
    RolePermission: typeof Model & { new (): Model };
  }) {
    Role.hasMany(models.User, { foreignKey: 'roleId' });
    Role.belongsToMany(models.Permission, {
      through: models.RolePermission,
      foreignKey: 'roleId',
      otherKey: 'permissionId',
      as: 'permissions',
    });
  }
}
