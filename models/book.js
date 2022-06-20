// Dependencies
const mongoose = require("mongoose");
// get Schema class from mongoose
const { Schema } = mongoose

// define book Schema
const bookSchema = new Schema({
    title: {type: String},
    description: {type: String},
    year: {type: Number},
    quantity: {type: Number},
    imageURL: {type: String}
})

// Model the book Schema as a collection named "Book" in MongoDB
const Book = mongoose.model("Book", bookSchema);
// Export the model
module.exports = Book;
