const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {UserModel} = require('./User.model')

const PostSchema = new Schema({
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    content: { type: String, required: true },
    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    }],
    comments:  [{ 
        type: Schema.Types.ObjectId, 
        ref: 'comment'
    }]
})
const PostModel = mongoose.model('post',PostSchema);
class Post{
    static async createPost(author, content){
        const user = await UserModel.findOne({_id: author})
        if(!user) throw new Error('Cannot find author!')
        const post = await PostModel.create({author, content})
        if(!post) throw new Error('Cannot create post!')
        const userUpdate = await UserModel.findByIdAndUpdate(
            { _id: author },
            { 
                $addToSet:{posts: post._id}
            }
        )
        return post;
    }
    static async updatePost(author, _id, content){
        const post = await PostModel.findOneAndUpdate(
            { author, _id },
            { content },
            { new: true }
        );
        if(!post) throw new Error('Cannot update post!')
        return post;
    }
    static async detelePost(author, _id){
        // pull id post in collection users
        const user = await UserModel.findOne({_id:author})
        if(!user) throw new Error('Cannot find author');
        const post = await PostModel.findOne({_id})
        if(!post) throw new Error('Cannot find post');

        user = await UserModel.findOneAndUpdate(
            {_id:author},
            {
                $pull: { posts: _id }
            }
        )
        if(!user) throw new Error('Cannot update author');
        post = await PostModel.deleteOne({ _id })
        if(!post) throw new Error('Cannot delete post!');
        return true;
    }
}
module.exports = { PostModel, Post}
