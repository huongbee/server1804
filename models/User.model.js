const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hash, compare } = require('../lib/bcrypt')

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
        return user;
    }
}

module.exports = { UserModel, User }

