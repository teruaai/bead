module.exports = {
    identity: 'subject',
    connection: 'default',
    attributes: {
        subject: {
            type: 'String',
            required: true
        },
        credits: {
            type: 'integer',
            required: true
        },
    
        courses: {
            collection: 'course',
            via: 'subject'
        }
    }
}