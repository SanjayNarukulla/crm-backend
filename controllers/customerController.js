const { Op } = require("sequelize");
const Customer = require("../models/customer");
const { errorHandler } = require("../utils/errorHandler");

// Get all customers with search, filtering, and pagination
exports.getCustomers = async (req, res) => {
  const { search, company, limit = 10, offset = 0 } = req.query;

  const where = { userId: req.user.id };
  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { phone: { [Op.like]: `%${search}%` } },
    ];
  }
  if (company) {
    where.company = company;
  }

  try {
    const { rows: customers, count } = await Customer.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      customers,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!customer) throw new Error("Customer not found");

    res.status(200).json(customer);
  } catch (error) {
    errorHandler(res, error, 404);
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    const customer = await Customer.create({
      name,
      email,
      phone,
      company,
      userId: req.user.id,
    });

    res.status(201).json(customer);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Customer.update(req.body, {
      where: { id, userId: req.user.id },
    });

    if (!updated) throw new Error("Customer not found or not authorized");

    const updatedCustomer = await Customer.findOne({ where: { id } });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    errorHandler(res, error, 404);
  }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Customer.destroy({
      where: { id, userId: req.user.id },
    });

    if (!deleted) throw new Error("Customer not found or not authorized");

    res.status(204).send(); // No content
  } catch (error) {
    errorHandler(res, error, 404);
  }
};
