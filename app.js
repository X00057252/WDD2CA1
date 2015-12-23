//loading modules
var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session')

//Routers
var controllers    = require('./controllers/index');
var spottings           = require('./controllers/spottings');
var profile        = require('./controllers/profile');
var admin          = require('./controllers/admin');

//creating an express app
var app = express();

//view path and view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//using simple setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret' }));
app.use(express.static(path.join(__dirname, 'public')));


// mapping URLS->controllers
app.use('/', controllers);
app.use('/spottings',spottings)
app.use('/profile',profile)
app.use('/admin',admin)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

//exporting the app
module.exports = app;
