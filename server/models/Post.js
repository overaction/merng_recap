const {model, Schema} = require('mongoose');
const ObjectId = Schema.Types.ObjectId;
const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
            email: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
            email: String,
        }
    ],
    user: {
        type: ObjectId,
        ref: 'users'
    }
});

module.exports = model('posts', postSchema);