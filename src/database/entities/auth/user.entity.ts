import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { hashIfNeeded } from '../../../helpers/bcrypt.helper';

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare roleId: number;
  declare nurseryId: number;
  declare documentNumber: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(100), allowNull: false },
        lastName: { type: DataTypes.STRING(100), allowNull: false },
        documentNumber: { type: DataTypes.STRING(100), allowNull: false },
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
          unique: 'uk_user_email',
        },
        password: { type: DataTypes.TEXT, allowNull: false },
        roleId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        nurseryId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'user',
        modelName: 'User',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        defaultScope: {
          attributes: { exclude: ['password'] },
        },
        indexes: [
          { name: 'idx_user_role', fields: ['roleId'] },
          { name: 'idx_user_nursery', fields: ['nurseryId'] },
          { name: 'idx_user_deletedAt', fields: ['deletedAt'] },
        ],
        hooks: {
          beforeSave: async (user: User) => {
            if (user.isNewRecord || user.changed('password')) {
              user.password = await hashIfNeeded(user.password);
            }
          },

          beforeBulkCreate: async (users: User[]) => {
            await Promise.all(
              users.map(async (u) => {
                u.password = await hashIfNeeded(u.password);
              }),
            );
          },
        },
      },
    );

    return User;
  }

  static associate(models: {
    Role: typeof Model & { new (): Model };
    Nursery: typeof Model & { new (): Model };
  }) {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
    User.belongsTo(models.Nursery, { foreignKey: 'nurseryId' });
    User.hasMany(models.Nursery, {
      as: 'ownedNurseries',
      foreignKey: 'userId',
    });
  }
}
