import { Model, DataTypes, Sequelize } from 'sequelize';

export default class State extends Model {
  static initModel(sequelize: Sequelize) {
    State.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(120), allowNull: false },
        code: { type: DataTypes.STRING(10), allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'states',
        modelName: 'State',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
          { name: 'idx_state_deletedAt', fields: ['deletedAt'] },
          { name: 'uk_state_name', unique: true, fields: ['name'] },
          { name: 'uk_state_code', unique: true, fields: ['code'] },
        ],
      },
    );
    return State;
  }

  static associate(models: { City: typeof Model & { new (): Model } }) {
    if (models.City) {
      State.hasMany(models.City, { as: 'cities', foreignKey: 'stateId' });
    }
  }
}
