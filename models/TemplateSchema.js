const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        border: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
