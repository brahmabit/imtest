const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userDetails = new Schema({
    name: {type: String, required: false, default: null},
    dob: {type: Date, required: false, default: null},
    address: {type: String, required: false, default: null},
    phone: {type: String, required: false, default: null},
    state: {type: String, required: false, default: null},
    zip: {type: String, required: false, default: null},
    email: {type: String, required: false, default: null},
    gender: {type: String, required: false, default: null},
    userType: {type: String, required: false, default: null},
    applicationId: {type: String, required: true, default: '01'},
}, {
    timestamps: true
});


module.exports = mongoose.model('userDetails', userDetails, 'userDetails')
