var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    req.app.models.course.find()
    .populate('users', { where: {id: req.user.id} })
    .populate('teacher').populate('subject')
    .then(function (courses) {
        res.render('list', { courses: courses });
    });
});


router.get('/new', function (req, res) {
    req.app.models.course.find().populate('teacher').populate('subject').then(function (courses) {
        res.render('add',{messages: req.flash(), courses: courses});
    });
});

router.get('/delete/:id', function (req, res) {
    req.app.models.user.findOne({ id: req.user.id }).populate('courses').then(function (user) {
        if (!user) return res.redirect('/auth/logout');
        
        console.log(user);
        
        user.courses.remove(req.params.id);
        user.save(function () {
            req.flash('info', 'Kurzus sikeresen leadva.');
            return res.redirect('/schedule');
        });
    });
});



router.post('/new', function (req, res) {
    req.checkBody('course', 'Nincs kiválasztás').notEmpty().withMessage('Kötelező kurzust választani!');
   
    var validationErrors = req.validationErrors(true);
    
    if (validationErrors) {
        req.flash('error', validationErrors);
        return res.redirect('/schedule/new');
    }

    req.app.models.user.findOne({ id: req.user.id }).then(function (user) {
        if (!user) return res.redirect('/auth/logout');
        
        //TODO: hamis érték?
        user.courses.add(req.body.course);
        user.save(function () {
            req.flash('info', 'Kurzus sikeresen felvéve.');
            return res.redirect('/schedule/new');
        });
    })
});


module.exports = router;
