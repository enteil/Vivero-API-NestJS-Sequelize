import { Model, DataTypes, Sequelize } from 'sequelize';

export default class City extends Model {
  static initModel(sequelize: Sequelize) {
    City.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(150), allowNull: false },
        stateId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'cities',
        modelName: 'City',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
          { name: 'idx_city_state', fields: ['stateId'] },
          { name: 'idx_city_deletedAt', fields: ['deletedAt'] },
          {
            name: 'uk_city_name_state',
            unique: true,
            fields: ['stateId', 'name'],
          },
        ],
      },
    );
    return City;
  }

  static associate(models: { State: typeof Model & { new (): Model } }) {
    if (models.State) {
      City.belongsTo(models.State, { foreignKey: 'stateId' });
    }
  }
}
