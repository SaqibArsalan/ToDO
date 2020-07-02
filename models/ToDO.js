const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDo = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
