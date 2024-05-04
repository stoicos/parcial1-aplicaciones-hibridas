import mongoose from "mongoose"

const directorsSchema = new mongoose.Schema({
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    }
})

export default mongoose.model('directors', directorsSchema)