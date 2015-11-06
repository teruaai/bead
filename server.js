var express = require('express');
var bodyParser = require('body-parser');

var expressValidator = require('express-validator'); // formok validálására
var session = require('express-session'); // munkamenet-kezelés (pl.: bejelentkezés)
var flash = require('connect-flash'); // flash üzenetek tárolása a következő oldal megjelenéséig

var Waterline = require('waterline'); // adatbázis-kezeléshez
var waterlineConfig = require('./config/waterline'); // Waterline konfigurációs fájl

var passport = require('passport'); // bejelentkezés/regisztráció
var LocalStrategy = require('passport-local').Strategy;

// Routerek
var scheduleRouter = require('./controllers/schedule');
var adminRouter = require('./controllers/admin');
var authRouter = require('./controllers/auth');

// Modellek
var userCollection = require('./models/user');
var subjectCollection = require('./models/subject');
var courseCollection = require('./models/course');
var teacherCollection = require('./models/teacher');


var app = express();

//  Handlebars beállítások --------------------

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

//  Passport beállítások --------------------

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    },   
    function(req, username, password, done) {
        req.app.models.user.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, { message: 'A megadott felhasználónév már létezik.' });
            }
            
            req.app.models.user.create(req.body)
            .then(function (user) {
                return done(null, user);
            })
            .catch(function (err) {
                return done(null, false, { message: err.details });
            })
        });
    }
));


passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function(req, username, password, done) {
        req.app.models.user.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Helytelen adatok.' });
            }
            return done(null, user);
        });
    }
));


//  Middleware segédfüggvény --------------------

function setLocalsForLayout() {
    return function (req, res, next) {
        res.locals.loggedIn = req.isAuthenticated();
        res.locals.user = req.user;
        next();
    }
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/auth/login');
}

function andRestrictTo(role) {
    return function(req, res, next) {
        if (req.user.role == role) {
            next();
        } else {
            next(new Error('Unauthorized'));
        }
    }
}






app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session({
    secret: '{U>tNmbNd1_J/7pwY2[3X[(qz!',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

app.use(setLocalsForLayout());


//  Routerek --------------------

app.get('/', function (req, res) {
    res.redirect('/schedule');
});

app.use('/schedule', ensureAuthenticated, scheduleRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);


//  Adatbázis ORM beállítások --------------------
var orm = new Waterline();
orm.loadCollection(Waterline.Collection.extend(courseCollection));
orm.loadCollection(Waterline.Collection.extend(subjectCollection));
orm.loadCollection(Waterline.Collection.extend(teacherCollection));
orm.loadCollection(Waterline.Collection.extend(userCollection));

// ORM indítása
orm.initialize(waterlineConfig, function(err, models) {
    if(err) throw err;
    
    app.models = models.collections;
    app.connections = models.connections;
    
    // Start Server
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.log('Server is started.');
    });
    
    console.log("ORM is started.");
});