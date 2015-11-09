var bcrypt = require('bcryptjs');

module.exports = {
    identity: 'user',
    connection: 'default',
    attributes: {
       
        username: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
            required: true,
        },
        
        admin: {
            type: 'boolean',
            defaultsTo: false
        },
        
        courses: {
            collection: 'course',
            via: 'users',
            dominant: true
        },
        
        validPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        }
    },
    
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) {
                return next(err);
            }
            values.password = hash;
            next();
        });
    }
};