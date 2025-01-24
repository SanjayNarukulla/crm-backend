const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Customer = sequelize.define("Customer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
});

User.hasMany(Customer, { foreignKey: "userId" });
Customer.belongsTo(User, { foreignKey: "userId" });

module.exports = Customer;
