var express = require('express');
var router = express.Router();
const passport = require('passport');
const localStrategy = require("passport-local").Strategy; 
const userModel = require("./users");


// ... rest of the authentication route code


passport.use(new localStrategy(userModel.authenticate())); 

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render("profile");
});

// Register route
router.post('/register', function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userdata, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/profile');
      });
    })
    .catch(function (err) {
      console.error(err);
      res.redirect('/'); // Redirect to the home page or handle the error as needed
    });
});

// Login route
router.post("/login", passport.authenticate("local", { 
  successRedirect: "/profile",
  failureRedirect: "/"
}));

// Logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
