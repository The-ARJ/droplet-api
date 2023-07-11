const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card-controller");
const upload = require("../middleware/upload");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

router
    .route("/")
    .get(verifyUser, cardController.getAllCards)
    .post(verifyUser, upload.single("cardImage"), cardController.createCard)
    .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .delete(verifyAdmin,cardController.deleteAllCards);

router
    .route("/:card_id")
    .get(cardController.getCardById)
    .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .put(verifyUser, upload.single("cardImage"), cardController.updateCardById)
    .delete(verifyUser, cardController.deleteCardById);

module.exports = router;
