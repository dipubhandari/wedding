import mongoose from "mongoose";

const Vender_Schema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: false }
})

const VenderModel = mongoose.model('venders', Vender_Schema)

export default VenderModel