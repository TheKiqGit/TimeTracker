var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

require('./config/passport')(passport); //pass passport for configuration
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.all('/*', function(req, res, next){
  //CORS headers
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Access-Token');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
//app.all('/api/v1/*', [require('./middlewres/validateRequest')]);

//Passport Config
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/Users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
