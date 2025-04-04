import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "hybr_toolkit",
  process.env.DB_USER || "hybr_user",
  process.env.DB_PASS || "NVkjMWJrdMvy8Laa5iK7j3i9LJuZqmcV",
  {
    host: process.env.DB_HOST || "dpg-cvo0joemcj7s73b1d360-a",
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
  }
);

export default sequelize;
