import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import movie_routes from './routes/movies_routes.js'
import director_routes from './routes/directors_routes.js'
import user_routes from './routes/users_routes.js'
import auth from "./routes/auth.js"

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Conexión a la DB establecida')
    })
    .catch(() => {
        console.log('Error de conexión')
    })

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/users', user_routes)
app.use('/movies', movie_routes)
app.use('/directors', director_routes)
app.use('/login', auth)

const port = process.env.PORT || 3002

app.listen(port)