const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let policyDetails = new Schema({
    userId: {type: Schema.Types.ObjectId, required: false, default: null},
    agentId: {type: Schema.Types.ObjectId, required: false, default: null},
    userAccountId: {type: Schema.Types.ObjectId, required: false, default: null},
    policyNumber: {type: String, required: false, default: null},
    startDate: {type: Date, required: false, default: null},
    endDate: {type: Date, required: false, default: null},
    lobId: {type: Schema.Types.ObjectId, required: false, default: null},
    companyId: {type: Schema.Types.ObjectId, required: false, default: null},
    policyType: {type: String, required: false, default: null},
    producer: {type: String, required: false, default: null},
    premiumAmount: {type: Number, required: false, default: null},
    applicationId: {type: String, required: true, default: '01'},
}, {
    timestamps: true
});


module.exports = mongoose.model('policyDetails', policyDetails, 'policyDetails')
