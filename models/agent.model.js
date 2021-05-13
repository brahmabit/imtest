const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let agentDetails = new Schema({
    name: {type: String, required: false, default: null},
    applicationId: {type: String, required: true, default: '01'},
}, {
    timestamps: true
});


module.exports = mongoose.model('agentDetails', agentDetails, 'agentDetails')
