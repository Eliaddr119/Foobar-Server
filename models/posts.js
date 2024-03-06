import mongoose from 'mongoose';

const schema = mongoose.Schema;

const Post = new schema({
    id: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    displayName:
    {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    // comments: {
    //     type: [String],
    //     default: []
    // },
    numlikes: {
        type: Number,
        default: 0
    },
    likeby: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        default: ''
    }
});

export default mongoose.model('Post', Post);