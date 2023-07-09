const Card = require("../models/CardSchema");

const getAllCards = (req, res, next) => {
  const userId = req.user.id; // Assuming you have the authenticated user's ID available in req.user.id
  const userRole = req.user.role; // Assuming you have the user's role available in req.user.role

  let query = {};

  if (userRole !== 'admin') {
    query = { owner: userId };
  }

  Card.find(query)
    .then((complaints) => {
      res.status(200).json({
        success: true,
        message: "Complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error retrieving complaints",
        error,
      });
    });
};

const createCard = (req, res, next) => {
  let card = {
    ...req.body,
    owner: req.user.id,
  };

  if (req.file) {
    card.image = "/card_images/" + req.file.filename;
  }

  Card.create(card)
    .then((createdCard) => {
      res.status(201).json({
        message: "Card created successfully",
        card: createdCard,
      });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error creating card",
        error: error.message,
      });
    });
};
const updateCardById = (req, res, next) => {
  const cardId = req.params.card_id;
  const updates = req.body;

  if (req.file) {
    updates.image = "/card_images/" + req.file.filename;
  }
  Card.findByIdAndUpdate(cardId, updates, { new: true })
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).json({ error: "Card not found" });
      }

      res.json({
        success: true,
        message: "Card updated successfully",
        data: updatedCard,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating card", error });
    });
};

const deleteAllCards = (req, res, next) => {
  Card.deleteMany()
    .then(() => {
      res.status(200).json({ message: "All cards deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting all cards", error });
    });
};

const getCardById = (req, res, next) => {
  Card.findById(req.params.card_id)
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }
      res.json({
        success: true,
        message: "Card retrieved successfully",
        data: card,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving card", error });
    });
};


const deleteCardById = (req, res, next) => {
  const cardId = req.params.cardid;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (card) {
        res.json({ message: "Card deleted successfully" });
      } else {
        res.status(404).json({ message: "Card not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting card", error });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteAllCards,
  getCardById,
  updateCardById,
  deleteCardById,
};
