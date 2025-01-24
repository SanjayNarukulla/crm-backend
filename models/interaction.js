const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer");

const Interaction = sequelize.define("Interaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Customer, key: "id" },
  },
  note: { type: DataTypes.STRING, allowNull: false },
});

Customer.hasMany(Interaction, { foreignKey: "customerId" });
Interaction.belongsTo(Customer, { foreignKey: "customerId" });

module.exports = Interaction;
