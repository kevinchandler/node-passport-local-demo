var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/users');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
     if (user.password != password) { 
     	return done(null, false, { 
     		message: 'Invalid password' 
     	}); }

      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true},
});

var User = mongoose.model('User', userSchema);

var flash = require('connect-flash');


exports.dashboard = function(req, res){
	if (!req.user) {
			res.redirect('/dashboard/login')
		} else {
		res.render('dashboard', { user: req.user.username } )
	}

};


exports.login = function(req, res) {
	if (req.user) {
		res.redirect('/dashboard');
	}
	res.render('login');
};


exports.register = function(req, res) {
	if (req.user) {
		req.user = null;
	}
	var user = new User({ 
		username: req.body.username,
		email: req.body.email, 
		password: req.body.password 
	});
	
	user.save(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	    res.render('dashboard', {user: user.username});
	  }
	});
	
}