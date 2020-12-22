const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Book = require('./models/book'); 

mongoose.connect('mongodb://localhost:27017/bookinventory', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false }, 
    console.log('Mongo Connection OPEN'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended : true }));

// Main navigation page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/views/bookinventory/front.html'));
});

// Page to that list bookiventory
app.get('/bookinventory/list', async function(req, res) {
    const books = await Book.find({});
    // console.log(books);
    res.render('bookinventory/list', { books });
});

// Add a book to the list 
app.get('/bookinventory/add', function(req, res){
    res.render('bookinventory/add')
});

app.post('/bookinventory/add', async function(req, res) {
    const newBook = new Book(req.body); // creates book object
    await newBook.save();
    res.redirect(`/bookinventory/list`);

});

app.get('/bookinventory/:id', async function(req, res){
    const {id} = req.params;
    const book = await Book.findById(id);
    // console.log(book);
    res.render('bookinventory/showbook', { book });
});

app.listen(process.env.PORT || 8181, function(){
    console.log('Connection on localhost:8181');
});