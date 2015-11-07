var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/login', function (req, res) {
    res.render('login', { messages: req.flash() });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/signup', function (req, res) {
    res.render('signup', { messages: req.flash() });
});


// ------------------------------------------

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/schedule',
    failureRedirect: '/auth/login',
    failureFlash: true,
    badRequestMessage: 'Hibás felhasználónév vagy jelszó!'
}));

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect:    '/schedule',
    failureRedirect:    '/auth/signup',
    failureFlash:       true,
    badRequestMessage:  'Sikertelen regisztráció.'
}));

module.exports = router;