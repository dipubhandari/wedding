import express from 'express'
import AuthController from '../controller/authController.js'

const authRouter = express.Router()

// routes for authentication
authRouter.post('/create-new-account', AuthController.NewAccount)
authRouter.post('/login', AuthController.Login)
// routes for authentication till

// exporting the routes
export default authRouter