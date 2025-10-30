import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Nursery extends Model {
  static initModel(sequelize: Sequelize) {
    Nursery.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(150), allowNull: false },
        cityId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        stateId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'nursery',
        modelName: 'Nursery',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
          { name: 'idx_nursery_user', fields: ['userId'] },
          { name: 'idx_nursery_deletedAt', fields: ['deletedAt'] },
        ],
      },
    );
    return Nursery;
  }

  static associate(models: {
    User: typeof Model & { new (): Model };
    Plant: typeof Model & { new (): Model };
    Product: typeof Model & { new (): Model };
    PlantProduct: typeof Model & { new (): Model };
  }) {
    Nursery.belongsTo(models.User, { as: 'owner', foreignKey: 'userId' });
    Nursery.hasMany(models.Plant, { foreignKey: 'nurseryId' });
    Nursery.hasMany(models.Product, { foreignKey: 'nurseryId' });
    Nursery.hasMany(models.User, { as: 'users', foreignKey: 'nurseryId' });
    Nursery.hasMany(models.PlantProduct, { foreignKey: 'nurseryId' });
  }
}
