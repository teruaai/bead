module.exports = {
    identity: 'teacher',
    connection: 'default',
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        room: {
            type: 'string',
            required: true
        },
        
        courses: {
            collection: 'course',
            via: 'teacher'
        }
    }
}