import categoryController from '../controller/categoryController.js'
import auth from '../middleware/authenticate.js'
import express from 'express'

const categoryRouter = express.Router()

// protected
// routes for creating categorues
categoryRouter.post('/add-category', categoryController.CreateCategory)
// routes for fetching the categories all
categoryRouter.get('/categories', categoryController.Categories)
// routes for fetching the categories all
categoryRouter.delete('/delete-categories/:id', categoryController.DeleteCategory)

// exporting the routes
export default categoryRouter