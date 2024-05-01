import User from "../models/users_model.js"
import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const route = express.Router()

route.post('/', (req, res) => {
    User.findOne({email: req.body.email})
    .then(data => {
        if(data){
            const validPassword = bcrypt.compareSync(req.body.password, data.password)
            if(!validPassword) {
                return res.status(400).json({msj: "Contraseña incorrecta"})
            }
            const jwToken = jwt.sign({
                user: {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }
            }, process.env.SEED, {expiresIn: process.env.EXPIRATION})
            res.json({
                user: {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }, jwToken
            })
        }else{
            res.status(400).json({msj: "Dirección de email incorrecta"})
        }
    })
})

export default route;