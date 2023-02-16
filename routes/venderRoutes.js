import express from 'express'
import VenderController from '../controller/venderController.js'
import multer from 'multer'

const venderRouter = express.Router()

// setting multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/images/vendors')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })
// multer till here

// routes for vender
venderRouter.get('/featured-vendors', VenderController.FeaturedVendor)
venderRouter.post('/new-vendor', VenderController.NewVendor)
// routes for vender till

// exporting the routes
export default venderRouter