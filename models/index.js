const sequelize = require("../config/database");
const User = require("./user");
const Customer = require("./customer");
const Interaction = require("./interaction");

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectDB, User, Customer, Interaction };
