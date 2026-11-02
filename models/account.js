import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const accountSchema = new Schema({
    username: { type: String, min: 6, required: true, unique: true },
    password: { type: String, min: 6, required: true },
    avatar: { type: String, default: 'https://images.vexels.com/media/users/3/155407/isolated/preview/84d636131360b843e427a4ff7061ae0a-striped-cat-avatar.png' },
}, {timestamps: true});
// thêm timestamps nó sẽ tự sinh ra createdAt và updatedAt
const Account = mongoose.model('accounts', accountSchema);

export default Account;