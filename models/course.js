module.exports = {
    identity: 'course',
    connection: 'default',
    attributes: {
        subject: {
            model: 'subject',
            required: true
        },
        teacher: {
            model: 'teacher',
            required: true
        },
        time: {
            type: 'string',
            required: true
        },
        location: {
            type: 'string',
            required: true
        },
        
        users: {
            collection: 'user',
            via: 'courses'
        },
    }
}