import { Model, DataTypes, Sequelize } from 'sequelize';
import * as bcrypt from 'bcryptjs';

export default class Session extends Model {
  static initModel(sequelize: Sequelize) {
    Session.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        ip: { type: DataTypes.STRING(45), allowNull: false },
        token: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: 'uk_session_token',
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        meta: { type: DataTypes.JSON, allowNull: true, defaultValue: {} },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'sessions',
        modelName: 'Session',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
          { name: 'uk_session_token', unique: true, fields: ['token'] },
          { name: 'idx_session_user', fields: ['userId'] },
          { name: 'idx_session_active', fields: ['active'] },
          { name: 'idx_session_deletedAt', fields: ['deletedAt'] },
        ],
        hooks: {
          async beforeCreate(session) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(Date.now().toString(), salt);
            session.set('token', Buffer.from(hash).toString('base64'));
            session.set('active', true);
            session.set('meta', {});
          },
        },
      },
    );
    return Session;
  }

  static associate(models: { User: typeof Model & { new (): Model } }) {
    if (models.User) {
      Session.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
}
