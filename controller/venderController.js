import VenderModel from "../model/venderModel.js"


class VendorController {
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
            // const file = req.file.filename
            // console.log(file)
            if (!(name && description)) {
                res.status(400).send({ error_msg: "Please Enter Name and description both" })
            }
            else if (description.length < 50) {
                res.send({ error_msg: "Description must be more than 50 characters" })
            }
            else {
                const NewVendor = await VenderModel.create({
                    name, description
                })
                res.send({ success_msg: "Successfully New Vendor Added", data: NewVendor })
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Inserting the Vendor to the database

}

export default VendorController