// Making a Mongoose Model
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    publisher : {
        type: String,
        required: false
    },
    date : {
        type: Date,
        required: false
    },
    website : {
        type: String,
        required: false
    }
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book; 