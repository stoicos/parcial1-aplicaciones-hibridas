import mongoose from "mongoose"
const Schema = mongoose.Schema


const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    director: {
        type: Schema.Types.ObjectId, ref: 'directors'
    },
    year: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    cover: {
        type: String,
        required: false
    },
    score: {
        type: Number,
        required: false
    },
    duration: {
        type: Number,
        required: false
    }
})

export default mongoose.model('movies', moviesSchema)