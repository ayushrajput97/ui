// backend/models/rigmage.js
const mongoose = require('mongoose');

const rigmageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true }, // Reference to the User model
    name: { type: String, required: true },
    interest: { type: [String], default: [] } // Keywords array
});

const Rigmage = mongoose.model('Rigmage', rigmageSchema);
module.exports = Rigmage;