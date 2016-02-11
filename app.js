var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var passport = require('passport');

require('./api/models/db');
require('./api/config/passport');
var apiRoute = require('./api/routes/index')


//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

var clientFiles = [
  'client/main/app.module.js',
  'client/common/common.module.js',
  'client/common/services/pollsData.service.js',
  'client/common/services/authentication.service.js',
  'client/common/directives/navbar.directive.js',
  'client/common/directives/footer.directive.js',
  'client/lib/angular-route.min.js',
  'client/lib/angular-chart.min.js',
  'client/landing/landing.module.js',
  'client/landing/config.route.js',
  'client/landing/landing.controller.js',
  'client/home/home.module.js',
  'client/home/config.route.js',
  'client/home/home.controller.js',
  'client/home/homeResult.controller.js',
  'client/pollDashBoard/pollDashboard.module.js',
  'client/pollDashBoard/config.route.js',
  'client/pollDashBoard/pollDashboard.controller.js',
  'client/pollDashboard/userPolls.controller.js',
  'client/pollDashboard/editPoll.controller.js',
  'client/auth/auth.module.js',
  'client/auth/config.route.js',
  'client/auth/register.controller.js',
  'client/auth/login.controller.js'
];
var uglified = uglifyJs.minify(clientFiles, { compress : false });

fs.writeFile('public/js/votexr.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'votexr.min.js');
  }
});



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

app.use(passport.initialize());

app.use('/api', apiRoute);

//app.use('/users', users);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function(err,req,res,next){
  if(err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({
      "message" : err.name + ": " + err.message
    })
  }
})


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
