const express = require('express');
const path = require('path');

const app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/views/main.html'));
})

app.listen(3000, function(){
    console.log('Listening in port 3000');
});