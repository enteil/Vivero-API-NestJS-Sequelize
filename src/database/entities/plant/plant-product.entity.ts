import { Model, DataTypes, Sequelize } from 'sequelize';

export default class PlantProduct extends Model {
  static initModel(sequelize: Sequelize) {
    PlantProduct.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        plantId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        productId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        nurseryId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        expirationDate: { type: DataTypes.DATEONLY, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'plant_product',
        modelName: 'PlantProduct',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
          { name: 'idx_pp_plant', fields: ['plantId'] },
          { name: 'idx_pp_product', fields: ['productId'] },
          { name: 'idx_pp_nursery', fields: ['nurseryId'] },
          { name: 'idx_pp_deletedAt', fields: ['deletedAt'] },
        ],
      },
    );
    return PlantProduct;
  }

  static associate(models: {
    Plant: typeof Model & { new (): Model };
    Product: typeof Model & { new (): Model };
    Nursery: typeof Model & { new (): Model };
  }) {
    PlantProduct.belongsTo(models.Plant, { foreignKey: 'plantId' });
    PlantProduct.belongsTo(models.Product, { foreignKey: 'productId' });
    PlantProduct.belongsTo(models.Nursery, { foreignKey: 'nurseryId' });
  }
}
