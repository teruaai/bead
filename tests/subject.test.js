describe('SubjectModel', function () {
    
    var expect = require("chai").expect;
    var bcrypt = require("bcryptjs");
    
    var Waterline = require('waterline');
    var waterlineConfig = require('../config/waterline');
    
    var courseCollection = require('../models/course');
    var userCollection = require('../models/user');
    var teacherCollection = require('../models/teacher');
    var subjectCollection = require('../models/subject');
    
    var Subject;
    var Course;
    var Teacher;
    var orm;
    
    before(function (done) {
        // ORM indítása
        orm = new Waterline();
    
        orm.loadCollection(Waterline.Collection.extend(userCollection));
        orm.loadCollection(Waterline.Collection.extend(courseCollection));
        orm.loadCollection(Waterline.Collection.extend(subjectCollection));
        orm.loadCollection(Waterline.Collection.extend(teacherCollection));

        waterlineConfig.connections.default.adapter = 'memory';
    
        orm.initialize(waterlineConfig, function(err, models) {
            if(err) throw err;
            Subject = models.collections.subject;
            Course = models.collections.course;
            Teacher = models.collections.teacher;

            done();
        });
    });
    
    after(function () {
       orm.teardown(); 
    });


    beforeEach(function (done) {
        Subject.destroy({}, function (err) {
            done();
        });
    });
    
    it('should be able to create a subject', function () {
        return Subject.create({
            subject: 'Matek',
            credits: 1
        })
        .then(function (subject) {
            expect(subject.subject).to.equal('Matek');
            expect(subject.credits).to.equal(1);
            
        });
    });

    
    it('should be able to find a subject', function() {
       return Subject.create({
            subject: 'Matek',
            credits: 1
        })
        .then(function(subject) {
            return Subject.findOneBySubject(subject.subject);
        })
        .then(function (subject) {
            expect(subject.subject).to.equal('Matek');
            expect(subject.credits).to.equal(1);
            
        });
    });
    
    it('should be able to find a subject and populate its courses', function() {
       return Subject.create({
            subject: 'Matek',
            credits: 1
        })
        .then(function (subject) {
            
            return Teacher.create({
                name: 'Péter Simon',
                room: 'D-251'
            })
            .then(function (teacher) {
                return Course.create({
                    subject: subject.id,
                    teacher: teacher.id,
                    time: 'Kedd 22:00',
                    location: 'D-128'
                });
            });
        })
        .then(function (course) {
            return Subject.findOne({id: course.subject}).populate('courses');
        })
        .then (function (subject) {
            expect(subject.subject).to.equal('Matek');
            expect(subject.credits).to.equal(1);
            expect(subject.courses[0].time).to.equal('Kedd 22:00'); 
            expect(subject.courses[0].location).to.equal('D-128'); 
        });
    });
    
});
