const express = require("express");
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Routes
router.get("/", getCustomers); // Get all customers with search, filtering, and pagination
router.get("/:id", getCustomerById); // Get a single customer by ID
router.post("/", roleMiddleware(["admin"]), createCustomer); // Create a new customer (Admin only)
router.put("/:id", roleMiddleware(["admin"]), updateCustomer); // Update customer by ID (Admin only)
router.delete("/:id", roleMiddleware(["admin"]), deleteCustomer); // Delete customer by ID (Admin only)

module.exports = router;
