var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    
    req.app.models.teacher.find().then(function (teachers) {
        req.app.models.subject.find().then(function (subjects) {
            req.app.models.course.find().populate('subject').populate('teacher').then(function (courses) {
    
                res.render('admin-list', {
                    messages: req.flash(),
                    subjects: subjects,
                    teachers: teachers,
                    courses: courses
                });
                
            });
        });
    });
    
});

router.get('/add', function (req, res) {
    req.app.models.teacher.find().then(function (teachers) {
        req.app.models.subject.find().then(function (subjects) {
            res.render('admin-add', { 
                messages: req.flash(),
                subjects: subjects,
                teachers: teachers
            });
        });
    });
});



router.get('/delete/subject/:id', function (req, res) {
   req.app.models.course.destroy({ subject: req.params.id }).then(function () {
       req.app.models.subject.destroy({ id: req.params.id }).then(function () {
           req.flash('info', 'Tárgy sikeresen törölve.');
           res.redirect('/admin');
       });
   });
});

router.get('/delete/teacher/:id', function (req, res) {
   req.app.models.course.destroy({ teacher: req.params.id }).then(function () {
       req.app.models.teacher.destroy({ id: req.params.id }).then(function () {
           req.flash('info', 'Tanár sikeresen törölve.');
           res.redirect('/admin');
       });
   });
});

router.get('/delete/course/:id', function (req, res) {
   req.app.models.course.destroy({ id: req.params.id }).then(function () {
       req.flash('info', 'Kurzus sikeresen törölve.');
       res.redirect('/admin');
   });
});


router.get('/edit/teacher/:id', function (req, res) {
    req.app.models.teacher.findOne({ id: req.params.id }).then(function (teacher) {
        res.render('admin-edit', {
            editTeacher: true,
            teacher: teacher
        });
    });
});

router.get('/edit/subject/:id', function (req, res) {
    req.app.models.subject.findOne({ id: req.params.id }).then(function (subject) {
        res.render('admin-edit', {
            editSubject: true,
            subject: subject
        });
    });
});

router.get('/edit/course/:id', function (req, res) {
    req.app.models.teacher.find().then(function (teachers) {
        req.app.models.course.findOne({ id: req.params.id }).populate('subject').then(function (course) {
            res.render('admin-edit', {
                editCourse: true,
                course: course,
                teachers: teachers
            });
        });
    });
});

// ------------------------------------------

router.post('/add/subject', function (req, res) {
    req.checkBody('subject', 'Hibás tárgynév').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('credits', 'Hibás kredit').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    
    if (validationErrors) {
        req.flash('error', validationErrors);
        return res.redirect('/admin/add');
    }

    req.app.models.subject.create(req.body)
    .then(function (error) {
        req.flash('info', 'Tárgy sikeresen felvéve.');
        res.redirect('/admin/add');
    });
});



router.post('/add/teacher', function (req, res) {
    req.checkBody('name', 'Hibás név').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('room', 'Hibás szobaszám').notEmpty().withMessage('Kötelező megadni!');
    
    
    var validationErrors = req.validationErrors(true);
    
    if (validationErrors) {
        req.flash('error', validationErrors);
        return res.redirect('/admin/add');
    }

    req.app.models.teacher.create(req.body)
    .then(function (error) {
        req.flash('info', 'Tanár sikeresen hozzáadva.');
        res.redirect('/admin/add');
    });
});



router.post('/add/course', function (req, res) {
    req.checkBody('subject','Hiányzó kurzus').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('teacher','Hiányzó tanár').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('time', 'Hibás időpont').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('location', 'Hibás helyszín').notEmpty().withMessage('Kötelező megadni!');
    
    
    var validationErrors = req.validationErrors(true);
    
    if (validationErrors) {
        req.flash('error', validationErrors);
        return res.redirect('/admin/add');
    }

    req.app.models.course.create(req.body)
    .then(function (error) {
        req.flash('info', 'Kurzus sikeresen hozzáadva.');
        res.redirect('/admin/add');
    });
});


router.post('/edit/teacher/:id', function (req, res) {
    req.checkBody('name', 'Hibás név').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('room', 'Hibás szobaszám').notEmpty().withMessage('Kötelező megadni!');
    
    
    var validationErrors = req.validationErrors(true);
    
    if (validationErrors) {
        req.flash('error', validationErrors);
        return res.redirect('/admin' + req.path);
    }
    
    req.app.models.teacher.update({ id: req.params.id }, req.body).then(function (teacher) {
        req.flash('info', 'Tanár sikeresen szerkesztve.');
        res.redirect('/admin');
    });
});

router.post('/edit/subject/:id', function (req, res) {
    req.checkBody('subject', 'Hibás tárgynév').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('credits', 'Hibás kredit').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    
    if (validationErrors) {
        req.flash('error', validationErrors);
        return res.redirect('/admin' + req.path);
    }
    
    req.app.models.subject.update({ id: req.params.id }, req.body).then(function (subject) {
        req.flash('info', 'Tárgy sikeresen szerkesztve.');
        res.redirect('/admin');
    });
});

router.post('/edit/course/:id', function (req, res) {
    req.checkBody('subject','Hiányzó kurzus').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('teacher','Hiányzó tanár').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('time', 'Hibás időpont').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('location', 'Hibás helyszín').notEmpty().withMessage('Kötelező megadni!');
    
    
    var validationErrors = req.validationErrors(true);
    
    if (validationErrors) {
        req.flash('error', validationErrors);
        return res.redirect('/admin' + req.path);
    }
    
   req.app.models.course.update({ id: req.params.id }, req.body).then(function (course) {
        req.flash('info', 'Kurzus sikeresen szerkesztve.');
        res.redirect('/admin');
   });
});


module.exports = router;