//create basic web server
var express = require('express');
var app = express();
var path = require('path');

//set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set up public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

//set up the routes
app.use(require('./routes/index'));
app.use(require('./routes/comments'));

//start the server
app.listen(3000, function() {
    console.log('Comment server listening on port 3000');
});