var memoryAdapter = require('sails-memory');
var diskAdapter = require('sails-disk');

module.exports = {
    adapters: {
        memory:     memoryAdapter,
        disk:       diskAdapter,
    },
    connections: {
        default: {
            adapter: 'disk',
        },
        memory: {
            adapter: 'memory'
        },
        disk: {
            adapter: 'disk'
        },
    },
    defaults: {
        migrate: 'alter'
    },
};