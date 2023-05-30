import { User } from '../api/user/user.model';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

export class SequelizeConfig {
  sequelize: Sequelize;
  constructor() {
    this.sequelize = new Sequelize({
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: process.env.DB_DIALECT,
      pool: {
        max: 50,
        min: 1,
        idle: 10000
      },
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    } as SequelizeOptions);
  }

  setupModels(): void {
    // Set up models
    this.sequelize.addModels([User]);
  }

  async setupDb(): Promise<void> {
    await Promise.resolve(this.sequelize.authenticate());
    await Promise.resolve(this.sequelize.sync());
  }

  
}



