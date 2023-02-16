import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connection from './database/connection.js'
dotenv.config()
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import authRouter from './routes/authRoutes.js'
import venderRouter from './routes/venderRoutes.js'

const app = express()
connection(process.env.MONGO_URL)
const server = http.createServer(app)

// app.use(formData.parse())

app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use(express.json())


app.use(bodyParser.json({ limit: "50mb" }))

app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

// app.use('/', postRoutes)
app.use('/', authRouter)
app.use('/', venderRouter)
// deploy code


server.listen(process.env.port, () => { console.log(`The app is running in port`) })
