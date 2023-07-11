const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        borderRadius: {
            type: String,
        },
        width: {
            type: String,
        },
        height: {
            type: String,
        },
        color: {
            type: String,
        },
        textcolor: {
            type: String,
        },
        textalignment: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        image: {
            type: String,
            required: true,

        },
    },
    { timestamps: true }
);

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
