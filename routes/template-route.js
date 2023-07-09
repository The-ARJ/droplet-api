const express = require("express");
const router = express.Router();
const templateController = require("../controllers/template-controller");
const upload = require("../middleware/upload");
const { verifyUser } = require("../middleware/auth");

router
    .route("/")
    .get(verifyUser, templateController.getAllTemplates)
    .post(upload.single("templateImage"), templateController.createTemplate)
    .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .delete(templateController.deleteAllTemplates);

router
    .route("/:template_id")
    .get(templateController.getTemplateById)
    .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .put(upload.single("templateImage"), templateController.updateTemplateById)
    .delete(templateController.deleteTemplateById);

module.exports = router;
