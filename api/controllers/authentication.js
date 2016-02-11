var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function sendJsonResponse(res,status,content){
	res.status(status);
	res.json(content);
}

function register(req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJsonResponse(res, 200, {
        "token" : token
      });
    }
  });

};

function login(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();
      sendJsonResponse(res, 200, {
        "token" : token
      });
    } else {
      sendJsonResponse(res, 401, info);
    }
  })(req, res);

};

module.exports = {
	register:register,
	login:login
}