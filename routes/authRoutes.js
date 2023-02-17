import express from 'express'
import AuthController from '../controller/authController.js'
import auth from '../middleware/authenticate.js'

const authRouter = express.Router()


// protected
authRouter.post('/hy', auth, (req, res) => {
    res.send(req.user)
})

// public routes
// register routes
authRouter.post('/register', AuthController.Register)
// login route
authRouter.post('/login', AuthController.Login)


// exporting the routes
export default authRouter