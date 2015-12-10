/**
 * Created by Maharjan on 12/9/2015.
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var routes = require('./routes/index');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);


var port = 3030;
app.listen(port);
console.log('app listening to ' + port);
module.exports = app;



