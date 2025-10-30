import { Model, DataTypes, Sequelize } from 'sequelize';

export default class RolePermission extends Model {
  static initModel(sequelize: Sequelize) {
    RolePermission.init(
      {
        roleId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        permissionId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'role_permission',
        modelName: 'RolePermission',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
          { name: 'idx_roleperm_permission', fields: ['permissionId'] },
          { name: 'idx_roleperm_deletedAt', fields: ['deletedAt'] },
        ],
      },
    );
    return RolePermission;
  }

  static associate(models: {
    Role: typeof Model & { new (): Model };
    Permission: typeof Model & { new (): Model };
  }) {
    RolePermission.belongsTo(models.Role, { foreignKey: 'roleId' });
    RolePermission.belongsTo(models.Permission, { foreignKey: 'permissionId' });
  }
}
