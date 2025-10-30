import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Permission extends Model {
  static initModel(sequelize: Sequelize) {
    Permission.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        code: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: 'uk_permission_code',
        },
        description: { type: DataTypes.STRING(255), allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'permission',
        modelName: 'Permission',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [{ name: 'idx_permission_deletedAt', fields: ['deletedAt'] }],
      },
    );
    return Permission;
  }

  static associate(models: {
    Role: typeof Model & { new (): Model };
    RolePermission: typeof Model & { new (): Model };
  }) {
    Permission.belongsToMany(models.Role, {
      through: models.RolePermission,
      foreignKey: 'permissionId',
      otherKey: 'roleId',
      as: 'roles',
    });
  }
}
