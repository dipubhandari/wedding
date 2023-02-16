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
// variables
const app = express()
// server
const server = http.createServer(app)

// router
app.use('/', authRouter)

// database connection
connection(process.env.MONGO_URL)

// middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))



// listen the app
server.listen(process.env.port, () => { console.log(`The app is running in port`) })
