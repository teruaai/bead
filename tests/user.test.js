describe('UserModel', function () {
    
    var expect = require("chai").expect;
    var bcrypt = require("bcryptjs");
    
    var Waterline = require('waterline');
    var waterlineConfig = require('../config/waterline');
    
        var courseCollection = require('../models/course');
    var userCollection = require('../models/user');
    var teacherCollection = require('../models/teacher');
    var subjectCollection = require('../models/subject');
    
    var User;
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
            User = models.collections.user;

            done();
        });
    });
    
    after(function () {
       orm.teardown(); 
    });


    beforeEach(function (done) {
        User.destroy({}, function (err) {
            done();
        });
    });
    
    it('should be able to create a user', function () {
        return User.create({
            
            username: 'teszt',
            password: 'teszt123!',
            name: 'Teszt Elek',

        })
        .then(function (user) {
            expect(user.username).to.equal('teszt');
            expect(bcrypt.compareSync('teszt123!', user.password)).to.be.true;
            expect(user.name).to.equal('Teszt Elek');
            
        });
    });

    
    it('should be able to find a user', function() {
        return User.create({
            username: 'teszt',
            password: 'teszt123!',
            name: 'Teszt Elek',
        })
        .then(function(user) {
            return User.findOneByUsername(user.username);
        })
        .then(function (user) {
            expect(user.username).to.equal('teszt');
            expect(bcrypt.compareSync('teszt123!', user.password)).to.be.true;
            expect(user.name).to.equal('Teszt Elek');

        });
    });
    
    it('should throw an error to missing data', function () {
        return expect(User.create({
            username: '',
            password: 'teszt123!',
            name: 'Teszt Elek',
        })).to.throw;
    });
    
    it('should not accept a wrong password', function() {
         return User.create({
            username: 'teszt',
            password: 'teszt123!',
            name: 'Teszt Elek',
        }).then(function(user) {
             expect(user.validPassword('rossz')).to.be.false;
        })
    });
    
});