import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sessionSchema = new Schema({
    accountId: { type: ObjectId }
}, { timestamps: true });

const Session = mongoose.model('sessions', sessionSchema);

export default Session;