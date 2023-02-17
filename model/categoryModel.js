import mongoose from "mongoose";

const Category_Schema = mongoose.Schema({
    name: { type: String, required: true }
})

const Category__Model = mongoose.model('categories', Category_Schema)

export default Category__Model