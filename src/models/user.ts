/*
export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    const User  = sequelize.define("User", {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    surname: DataTypes.STRING
  }, {});
  // User.associate = function(models) {
    // associations can be defined here
  // };
  return User;
};*/

import * as Sequelize from "sequelize";

interface IUserAttributes {
  id?: string;              // id is an auto-generated UUID
  email: string;
  password: string;
  surname: string;
  createdAt?: string;
  updatedAt?: string;
}
type UserInstance = Sequelize.Instance<IUserAttributes> & IUserAttributes;
// type UserModel = Sequelize.Model<UserInstance, IUserAttributes>;

export default (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IUserAttributes> = {
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: false },
    email: { type: Sequelize.STRING, allowNull: false },
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    password: { type: Sequelize.STRING, allowNull: false },
    surname: { type: Sequelize.STRING, allowNull: false, defaultValue: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: false }
  };
  return sequalize.define<UserInstance, IUserAttributes>("User", attributes);
};
