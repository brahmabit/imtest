const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let message = new Schema({
    message: {type: String, required: false, default: null},
    applicationId: {type: String, required: true, default: '01'},
}, {
    timestamps: true
});


module.exports = mongoose.model('message', message, 'message')
