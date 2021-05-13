const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoryDetails = new Schema({
    name: {type: String, required: false, default: null},
    applicationId: {type: String, required: true, default: '01'},
}, {
    timestamps: true
});


module.exports = mongoose.model('categoryDetails', categoryDetails, 'categoryDetails')
