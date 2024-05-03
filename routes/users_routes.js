import express from "express"
import { createUser, getUsers, updateUser, deactivateUser, getUserByName, getUserById } from "../controllers/users_controller.js";
import Joi from "joi"
import verifyToken from "../middlewares/auth.js";

const route = express.Router();

const schema = Joi.object({
    name: Joi.string()
                .alphanum()
                .min(3)
                .max(60)
                .required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,60}$')),
    email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})

})

route.get('/', (req, res) => {
    let result = getUsers();
    result
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.get('/:id', (req, res) => {
    let result = getUserById(req.params.id);
    result
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.get('/name/:name', (req, res) => {
    let result = getUserByName(req);
    result
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

route.post('/', (req, res) => {
    let body = req.body;
    const {error, value} = schema.validate({
        name: body.name,
        email: body.email,
        password: body.password
    })
    if(!error){
        let result = createUser(body);
        result
            .then((user) => {
                res.status(201).json(user)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    }else{
        res.status(400).json(error) 
    }
})

route.put('/:id', verifyToken, (req, res) => {
    let body = req.body
    const { error, value } = schema.validate({
        name: body.name,
        email: body.email,
        password: body.password
    })
    if(!error) {
        let result = updateUser(req.params.id, body)
        result
            .then((user) => {
                res.status(201).json(user)
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
    let result = deactivateUser(req.params.id, body)
    result
        .then((user) => {
            res.status(201).json(user)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

export default route;