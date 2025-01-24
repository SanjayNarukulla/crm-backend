const Interaction = require("../models/interaction");

exports.createInteraction = async (req, res) => {
  try {
    const { note } = req.body;
    const { customerId } = req.params;

    const interaction = await Interaction.create({ customerId, note });
    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInteractions = async (req, res) => {
  try {
    const { customerId } = req.params;

    const interactions = await Interaction.findAll({ where: { customerId } });
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInteractionById = async (req, res) => {
  try {
    const { customerId, interactionId } = req.params;

    const interaction = await Interaction.findOne({
      where: { id: interactionId, customerId },
    });

    if (!interaction) {
      return res.status(404).json({ error: "Interaction not found" });
    }

    res.status(200).json(interaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInteraction = async (req, res) => {
  try {
    const { customerId, interactionId } = req.params;

    const result = await Interaction.destroy({
      where: { id: interactionId, customerId },
    });

    if (!result) {
      return res.status(404).json({ error: "Interaction not found" });
    }

    res.status(200).json({ message: "Interaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
