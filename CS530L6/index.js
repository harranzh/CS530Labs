const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var fs = require('fs');
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Needed when requesting params from user input
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/bookinventory/list', function(req, res){
    fs.readFile('data.json', function(err, data){ 
        if (err){
            throw err;
        } else {
            res.json(JSON.parse(data));
        }
    })
});

app.get('/bookinventory/add', function(req, res){
    res.render('add-book.ejs');
});

app.post('/bookinventory/add',function(req, res){
    // console.log(req.body);
    const title = req.body.title;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const date = req.body.date;
    const website = req.body.website;

    const newBook = {}; // create empty book object

    newBook.title = title;
    newBook.author = author;
    newBook.publisher = publisher;
    newBook.date = date;
    newBook.website = website;

    // readfile to push new book info
    fs.readFile('data.json', function(err, data){
        if (err){
            throw err
        }
        var json = JSON.parse(data);
        json.push(newBook);
        fs.writeFileSync('data.json', JSON.stringify(json));
        // console.log(json);
        res.send('Book Added');
    });

});

app.listen(7777, function(){
    console.log('Port on localhost: 7777');
})