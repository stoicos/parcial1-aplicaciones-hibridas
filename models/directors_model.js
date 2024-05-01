import mongoose from "mongoose"

const directorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
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
    }
})

export default mongoose.model('directors', directorsSchema)