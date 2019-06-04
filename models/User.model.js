const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hash, compare } = require('../lib/bcrypt')
const { sign } = require('../lib/jwt')

const UserSchema = new Schema({
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    avatar: {
        type: String,
        default: 'user-default.png'
    },
    posts: [
        { type: Schema.Types.ObjectId, ref: 'post' }
    ],
    friends: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],
    receiveRequests:  [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],
    sendRequests: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],
})
const UserModel = mongoose.model('user',UserSchema);

class User{
    static async signUp(email, password, name){
        const passwordHash = await hash(password)
        if(!passwordHash) throw new Error('Cannot create user!')
        const user = await UserModel.create({email, password: passwordHash, name })
        if(!user) throw new Error('Cannot create user!')
        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar
        };
    }
    static async signIn(email, password){
        const user = await UserModel.findOne({email})
        if(!user) throw new Error('Cannot find user!');
        const check = await compare(user.password, password)
        if(!check) throw new Error('Password invalid!');
        const token = await sign({ _id: user._id })
        if(!token) throw new Error('Cannot sign token!');
        return {
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar
            },
            token
        }
    }
    static async sendFriendRequest(idReceiver, idSender){
        const sender = await UserModel.findByIdAndUpdate(
            { _id: idSender},
            { 
                $addToSet: { sendRequests: idReceiver}
            },
            { new: true }
        ).select('name email')
        if(!sender) throw new Error('Cannot send friend request!')
        const receiver = await UserModel.findByIdAndUpdate(
            { _id: idReceiver},
            { 
                $addToSet: { receiveRequests: sender._id}
            },
            { new: true }
        ).select('name email')
        if(!receiver) throw new Error('Cannot send friend request!')
        return { sender,  receiver }
    }
    static async removeSendFriendRequest(idReceiver, idSender){
        const sender = await UserModel.findByIdAndUpdate(
            { _id: idSender},
            { 
                $pull: { sendRequests: idReceiver }
            }
        ).select('name email')
        if(!sender) throw new Error('Cannot remove sent friend request!')
        const receiver = await UserModel.findByIdAndUpdate(
            { _id: idReceiver},
            { 
                $pull: { receiveRequests: sender._id }
            }
        ).select('name email')
        if(!receiver) throw new Error('Cannot remove received friend request!')
        return { sender, receiver}
    }
}

module.exports = { UserModel, User }

