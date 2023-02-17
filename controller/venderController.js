import VenderModel from "../model/venderModel.js"


class VendorController {

    // delete vendor..
    static DeleteVendor = async (req, res) => {
        try {
            const id = req.params.id
            const datadelete = await VenderModel.findByIdAndDelete({
                _id: id
            })
            if (datadelete) {
                res.status(200).json({ success_msg: "Successfully Deleted..." })
            }
            else {
                res.status(400).send({ error_msg: "Try Again" })
            }
        } catch (error) {
            res.status(400).json({ error_msg: "Something Went Wrong" })
        }
    }

    // delete vendor.....................
    //  featured Vendors 
    static FeaturedVendor = async (req, res) => {
        try {
            // fetching all the vendeor from database
            const vendors = await VenderModel.find()
            if (vendors) {
                res.send(vendors)
            }
            else {
                res.send({ error_msg: "Something went wrong" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Inserting the Vendor to the database
    static NewVendor = async (req, res) => {
        try {

            // getting the data from the client

            const { name, description } = req.body
            const file = req.file
            if (!file) {
                res.status(400).send({ error_msg: "Please upload the file" })
            }
            if (!(name && description)) {
                res.status(400).send({ error_msg: "Please Enter Name and description both" })
            }
            else if (description.length < 50) {
                res.send({ error_msg: "Description must be more than 50 characters" })
            }
            else {
                const NewVendor = await VenderModel.create({
                    name, description, image: req.file.filename
                })
                res.status(200).send({ success_msg: "Successfully New Vendor Added", data: NewVendor })
            }
        } catch (error) {
            res.send({ success_msg: "Something Went Wrong" })
        }
    }
    // Inserting the Vendor to the database

}

export default VendorController