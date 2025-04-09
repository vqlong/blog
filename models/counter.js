const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const counterSchema = new Schema({
    id: { type: String },
    value: { type: Number }
});

const Counter = mongoose.model('counters', counterSchema);

module.exports = Counter;