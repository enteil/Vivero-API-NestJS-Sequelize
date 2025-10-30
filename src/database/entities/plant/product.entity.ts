import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Product extends Model {
  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        nurseryId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        name: { type: DataTypes.STRING(150), allowNull: false },
        price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        duration: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'product',
        modelName: 'Product',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
          { name: 'idx_product_nursery', fields: ['nurseryId'] },
          { name: 'idx_product_deletedAt', fields: ['deletedAt'] },
        ],
      },
    );
    return Product;
  }

  static associate(models: {
    Nursery: typeof Model & { new (): Model };
    Plant: typeof Model & { new (): Model };
    PlantProduct: typeof Model & { new (): Model };
  }) {
    Product.belongsTo(models.Nursery, { foreignKey: 'nurseryId' });
    Product.belongsToMany(models.Plant, {
      through: models.PlantProduct,
      foreignKey: 'productId',
      otherKey: 'plantId',
      as: 'plants',
    });
    Product.hasMany(models.PlantProduct, { foreignKey: 'productId' });
  }
}
