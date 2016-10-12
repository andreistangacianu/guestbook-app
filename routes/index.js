var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
    // If the user is authenticated call next to go to the next request handler
    if (req.isAuthenticated()) return next();

    res.redirect('/');
}

module.exports = function(passport) {
    /* GET LOGIN PAGE */
    router.get('/', function(req, res){
        res.render('index', { message: req.flash('message') });
    });

    /* Handle login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* Get registration page */
    router.get('/signup', function(req, res){
        res.render('register', { message: req.flash('message') });
    });

    /* Handle registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

    /* Handle Logout */
    router.get('/signout', function(req, res) {
      req.logout();
      res.redirect('/');
    });

    return router;
};
