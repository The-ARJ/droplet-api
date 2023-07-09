const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    jobTitle: {
        type: String,
        // required: [true, 'Job Title is required'],
    },
    company: {
        type: String,
        // required: [true, 'Company is required'],
    },
    email: {
        type: String,
        // required: [true, 'Email is required'],
    },
    phone: {
        type: String,
        // required: [true, 'Phone number is required'],
    },
    website: {
        type: String,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    socialMedia: {
        linkedIn: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    image: {
        type: String,
    },
    bio: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
    isPublished: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema);
