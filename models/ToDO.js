const mongoose = require('mongoose');

const ToDo = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ToDo', ToDo);
