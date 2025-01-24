const express = require("express");
const {
  getInteractions,
  createInteraction,
  getInteractionById,
  deleteInteraction,
} = require("../controllers/interactionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Routes
// Get all interactions for a specific customer
router.get("/customer/:customerId", getInteractions);

// Create a new interaction for a specific customer
router.post("/customer/:customerId", createInteraction);

// Get a specific interaction by its ID for a customer
router.get(
  "/customer/:customerId/interaction/:interactionId",
  getInteractionById
);

// Delete an interaction by its ID for a customer
router.delete(
  "/customer/:customerId/interaction/:interactionId",
  deleteInteraction
);

module.exports = router;
