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
import categoryRouter from './routes/categoryRoutes.js'

const app = express()
const server = http.createServer(app)

// app.use(formData.parse())
// middleware
app.use(cors())
app.use(express.json());
// Increase the maximum allowed request size to 50mb
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// router
app.use('/', categoryRouter)
app.use('/', authRouter)
app.use('/', venderRouter)
connection(process.env.MONGO_URL)
// app.use('/',categoryRouter)


// listen the app
server.listen(process.env.port, () => { console.log(`The app is running in port`) })
