import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
})

export default mongoose.model('users', usersSchema)