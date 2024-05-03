import express from "express"
import { createDirector, deactivateDirector, getDirectors, updateDirector, getDirectorBySurname, getDirectorById } from "../controllers/directors_controller.js"
import Joi from "joi"
import verifyToken from "../middlewares/auth.js"

const route = express.Router()

const schema = Joi.object({
    name: Joi.string()
                .min(3)
                .max(40),
    surname: Joi.string()
                .min(3)
                .max(20),
    age: Joi.number()
})

route.get('/', (req, res) => {
    let result = getDirectors()
    result
        .then((director) => {
            res.status(200).json(director)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.get('/surname/:surname', (req, res) => {
    let result = getDirectorBySurname(req)
    result
        .then((director) => {
            res.status(200).json(director)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.get('/:id', (req, res) => {
    let result = getDirectorById(req)
    result
        .then((director) => {
            res.status(200).json(director)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.post('/', verifyToken, (req, res) => {
    const { error, value } = schema.validate({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age
    })
    if(!error) {
        let result = createDirector(req)
        result
            .then((director) => {
                res.status(201).json(director)
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
        name: body.name,
        surname: body.surname,
        age: body.age
    })
    if(!error) {
        let result = updateDirector(req.params.id, body)
        result
            .then((director) => {
                res.status(201).json(director)
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
    let result = deactivateDirector(req.params.id, body)
    result
        .then((director) => {
            res.status(201).json(director)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

export default route