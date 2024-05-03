import express from "express"
import { createMovie, deactivateMovie, getMovies, updateMovie, getMovieByTitle, getMovieById, getMoviesByYearRange, getSortedMovies, getMoviesByPages } from "../controllers/movies_controller.js"
import Joi from "joi"
import verifyToken from "../middlewares/auth.js"

const route = express.Router()

const schema = Joi.object({
    title: Joi.string()
                .min(3)
                .max(60),
    synopsis: Joi.string()
                .min(3)
                .max(200),
    year: Joi.number(),
    cover: Joi.string()
                .min(3)
                .max(100)
})

route.get('/', (req, res) => {
    let result = getMovies()
    result
        .then((movies) => {
            res.status(200).json(movies)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.get('/pages/:pages', (req, res) => {
    let result = getMoviesByPages(req)
    result
        .then((movies) => {
            res.status(200).json(movies)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.get('/year', (req, res) => {
    let result = getSortedMovies()
    result
        .then((movies) => {
            res.status(200).json(movies)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.get('/year', (req, res) => {
    
    let minYear = Number(req.query.minyear)
    let maxYear = Number(req.query.maxyear)

    if(minYear > maxYear) {
        res.status(400).json({error: 'El año minimo no puede ser más grande que el máximo'})
    } else {
        let result = getMoviesByYearRange(minYear, maxYear)
        result
            .then((movies) => {
                if(movies.length === 0) {
                    res.status(404).json({error: 'No se encontraron peliculas en esos años'})
                } else {
                    res.status(200).json(movies)
                }
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
})

route.get('/:id', (req, res) => {
    // console.log(req.params)
    let result = getMovieById(req)
    result
        .then((movie) => {
            res.status(200).json(movie)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.get('/title/:title', (req, res) => {
    // console.log(req.params)
    let result = getMovieByTitle(req)
    result
        .then((movie) => {
            res.status(200).json(movie)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.post('/:id', verifyToken, (req, res) => {
    const { error, value } = schema.validate({
        title: req.body.title,
        synopsis: req.body.synopsis,
        year: req.body.year,
        cover: req.body.cover
    })
    if(!error) {
        let result = createMovie(req)
        result
            .then((movie) => {
                res.status(201).json(movie)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    } else {
        res.status(400).json(error)
    }
})

route.put('/:id', verifyToken, (req, res) => {
    let body = req.body
    const { error, value } = schema.validate({
        title: req.body.title,
        synopsis: req.body.synopsis,
        year: req.body.year,
        cover: req.body.cover
    })
    if(!error) {
        let result = updateMovie(req.params.id, body)
        result
            .then((movie) => {
                res.status(201).json(movie)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    } else {
        res.status(400).json(error)
    }
})

route.delete('/:id', verifyToken, (req, res) => {
    let body = req.body
    let result = deactivateMovie(req.params.id, body)
    result
        .then((director) => {
            res.status(201).json(director)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

export default route