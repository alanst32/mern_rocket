/**
 * Created by alanterriaga
 */
var express     = require('express');
var router      = require('./routes/routes.js');
var path        = require('path');
var mongoose    = require('mongoose');
var app         = express();
var bodyParser  = require('body-parser');

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
app.use('/', router);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

var port = 3000

app.listen(port, function() {
    console.log('running at localhost: ' + port);
});

module.exports=app;