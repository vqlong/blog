const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sessionSchema = new Schema({
    accountId: { type: ObjectId }
}, { timestamps: true });

const Session = mongoose.model('sessions', sessionSchema);

module.exports = Session;