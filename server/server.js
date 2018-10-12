/**
 * Created by alanterriaga
 */
var express         = require('express');
var router          = require('./routes/routes.js');
var path            = require('path');
var mongoose        = require('mongoose');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride 	= require('method-override');
var cookieParser 	= require('cookie-parser');

//==================================================================================
// Connect MongoDB database
mongoose.connect("mongodb://localhost:27017/rocketOzzy");

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"))

//==================================================================================
// Setting the applicatoin
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());

app.use('/', router);


var port = 3000

app.listen(port, function() {
    console.log('running at localhost: ' + port);
});

module.exports=app;