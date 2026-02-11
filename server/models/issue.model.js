const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true,
        default: "Low/Cosmetic",
        enum: ['Critical', 'Major', 'Minor', 'Low/Cosmetic']
    },
    priority: {
        type: String,
        required: true,
        default: "Low",
        enum: ['Critical', 'High', 'Medium', 'Low']
    },
    status: {
        type: String,
        required: true,
        default: "Open",
        enum: ['Open', 'In Progress', 'Resolved']
    }
}, { timestamps: true });

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;