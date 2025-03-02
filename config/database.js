const { Sequelize } = require("sequelize");
require("dotenv").config();

// For local development
const localDbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false, // Set to true for debugging queries
};

// For Render deployment, use the DATABASE_URL with SSL connection
const sequelize = new Sequelize(process.env.DATABASE_URL || localDbConfig, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important to avoid SSL certificate errors
    },
  },
});

module.exports = sequelize;
