
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'kevinwashereandthereandeverywherehewas' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.dashboard);
app.get('/dashboard', routes.dashboard);
app.get('/dashboard/login', routes.login);
app.post('/dashboard/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/dashboard/login'})
);

app.get('/dashboard/register', function (req, res) {
    res.render('register.jade');
});
app.post('/dashboard/register', routes.register);

app.get('/dashboard/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
