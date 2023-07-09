const Template = require("../models/TemplateSchema");

const getAllTemplates = (req, res, next) => {
    Template.find()
        .then((templates) => {
            res.status(200).json({
                success: true,
                message: "Templates retrieved successfully",
                data: templates,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Error retrieving templates",
                error,
            });
        });
};

const createTemplate = (req, res, next) => {
    const template = req.body;
    console.log(req.body)
    if (req.file) {
        template.image = "/template_images/" + req.file.filename;
    }

    Template.create(template)
        .then((createdTemplate) => {
            res.status(201).json({
                message: "Template created successfully",
                template: createdTemplate,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error creating template",
                error: error.message,
            });
        });
};

const deleteAllTemplates = (req, res, next) => {
    Template.deleteMany()
        .then(() => {
            res.status(200).json({ message: "All templates deleted successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error deleting all templates", error });
        });
};

const getTemplateById = (req, res, next) => {
    const templateId = req.params.template_id;

    Template.findById(templateId)
        .then((template) => {
            if (!template) {
                return res.status(404).json({ message: "Template not found" });
            }
            res.json({
                success: true,
                message: "Template retrieved successfully",
                data: template,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error retrieving template", error });
        });
};

const updateTemplateById = (req, res, next) => {
    const templateId = req.params.template_id;
    const updates = req.body;

    if (req.file) {
        updates.image = "/template_images/" + req.file.filename;
    }

    Template.findByIdAndUpdate(templateId, updates, { new: true })
        .then((updatedTemplate) => {
            if (!updatedTemplate) {
                return res.status(404).json({ error: "Template not found" });
            }

            res.json({
                success: true,
                message: "Template updated successfully",
                data: updatedTemplate,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error updating template", error });
        });
};

const deleteTemplateById = (req, res, next) => {
    const templateId = req.params.template_id;

    Template.findByIdAndDelete(templateId)
        .then((template) => {
            if (template) {
                res.json({ message: "Template deleted successfully" });
            } else {
                res.status(404).json({ message: "Template not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Error deleting template", error });
        });
};

module.exports = {
    getAllTemplates,
    createTemplate,
    deleteAllTemplates,
    getTemplateById,
    updateTemplateById,
    deleteTemplateById,
};
