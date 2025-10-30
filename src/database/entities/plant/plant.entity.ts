import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Plant extends Model {
  static initModel(sequelize: Sequelize) {
    Plant.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(150), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        nurseryId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'plant',
        modelName: 'Plant',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
          { name: 'idx_plant_nursery', fields: ['nurseryId'] },
          { name: 'idx_plant_deletedAt', fields: ['deletedAt'] },
        ],
      },
    );
    return Plant;
  }

  static associate(models: {
    Nursery: typeof Model & { new (): Model };
    Product: typeof Model & { new (): Model };
    PlantProduct: typeof Model & { new (): Model };
  }) {
    Plant.belongsTo(models.Nursery, { foreignKey: 'nurseryId' });
    Plant.belongsToMany(models.Product, {
      through: models.PlantProduct,
      foreignKey: 'plantId',
      otherKey: 'productId',
      as: 'products',
    });
    Plant.hasMany(models.PlantProduct, { foreignKey: 'plantId' });
  }
}
