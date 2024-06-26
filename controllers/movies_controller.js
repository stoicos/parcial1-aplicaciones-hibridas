import Movie from '../models/movies_model.js'

async function getMovies() {
    let movies = await Movie
        .find({ status: true })
        .populate('director', 'name surname -_id')
        return movies
}

async function getMovieByTitle(req) {
    let movie = await Movie.findOne({ title: { $regex: req.params.title, $options: 'i' } })
        .find({ status: true })
        .populate('director', 'name surname -_id')
    return movie
}

async function getMovieById(req) {
    let movie = await Movie.findOne({ _id : req.params.id })
        .find({ status: true })
        .populate('director', 'name surname -_id')
    return movie
}

async function getSortedMovies() {
    let movies = await Movie.find().sort({ title: 1 })
        .find({ status: true })
        .populate('director', 'name surname -_id')
    return movies
}

async function getMoviesByYearRange(min, max) {
    let movies = await Movie.find({ year: { $gte: min, $lte: max } })
        .find({ status: true })
        .populate('director', 'name surname -_id')
    return movies
}

async function getMoviesByPages(req) {
    let movie = await Movie.find().limit(req.params.pages)
        .find({ status: true })
        .populate('director', 'name surname -_id')
    return movie
}

async function createMovie(req) {
    let newMovie = new Movie({
        title: req.body.title,
        synopsis: req.body.synopsis,
        year: req.body.year,
        cover: req.body.cover,
        director: req.params.id,
        status: true
    })
    return await newMovie.save() 
}

async function updateMovie(id, body) {
    let updatedMovie = await Movie.findByIdAndUpdate(id, {
        $set: {
            title: body.title,
            synopsis: body.synopsis,
            year: body.year,
            cover: body.cover
        }
    }, { new: true })
    return updatedMovie 
}

async function deactivateMovie(id) {
    let deactivatedMovie = await Movie.findByIdAndUpdate(id, {
        $set: {
            status: false
        }
    }, { new: true })
    return deactivatedMovie
}

export { getMovies, createMovie, updateMovie, deactivateMovie, getMovieByTitle, getMovieById, getMoviesByYearRange, getSortedMovies, getMoviesByPages }