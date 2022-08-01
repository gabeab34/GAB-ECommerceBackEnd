import 'dotenv/config'
import express from 'express'
import Sequelize from 'sequelize';


const sequelize = process.env.MYSQLURI
  ? new Sequelize(process.env.MYSQLURI)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });


export default sequelize;
