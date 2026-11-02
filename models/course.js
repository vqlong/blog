import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const courseSchema = new Schema({
    id: { type: Number, required: true },
    accountId: { type: ObjectId, required: true },
    name: { type: String, min: 10, default: 'new course' },
    description: { type: String, min: 10, default: 'this is the description of the course' },
    thumb: { type: String, default: '' },
    slug: { type: String, required: true, unique: true },
    videoId: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });
// thêm timestamps nó sẽ tự sinh ra createdAt và updatedAt
// thêm unique nó sẽ tự sinh ra 1 index unique ở database
const Course = mongoose.model('courses', courseSchema);

export default Course;