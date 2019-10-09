import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import * as Sequelize from "sequelize";

const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// import config from __dirname + "/../config/db_config.json"[env];

const db: any = {};
dotenv.config();

let sequelize: any = {};
if (process.env.use_env_variable) {
  sequelize = new Sequelize.Sequelize(process.env[process.env.use_env_variable], process.env);
} else {
  sequelize = new Sequelize.Sequelize(process.env.database, process.env.username, process.env.password, process.env);
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize;

export default db;

/*
import Sequelize from 'sequelize-typescript';
import { DbInterface } from'typings/DbInterface';
import { UserFactory } from './User';
import { PostFactory } from './Post';
import { CommentFactory } from './Comment';

export const createModels = (sequelizeConfig: any): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize.Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Comment: CommentFactory(sequelize, Sequelize),
    Post: PostFactory(sequelize, Sequelize),
    User: UserFactory(sequelize, Sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

return db;
}*/
