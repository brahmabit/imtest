const { isMainThread ,parentPort, workerData } = require('worker_threads')
const agentModel = require('../models/agent.model')
const csv = require('csv-parser')
const fs = require('fs')
const mongoose = require('mongoose')
const carrierModel = require('../models/carrier.model')
const lobModel = require('../models/lob.model')
const policyModel = require('../models/policy.model')
const user_accountModel = require('../models/user_account.model')
const userModel = require('../models/user.model')


console.log(workerData)

console.log(isMainThread)

try {
    mongoose.connect('mongodb+srv://imtest:imtest@cluster0.usbzk.mongodb.net/imtest?retryWrites=true&w=majority', { useNewUrlParser: true })
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
  } catch (e) {
    console.log(e)
  }

const parseAdd = async function(){
    /*var check = await agentModel.findOne({name: "helloWorld1"})
    console.log(check)
    if(check == null || check == undefined){
        var rec = new agentModel({
            name:"helloWorld1"
        })
        rec.save();
    }*/
    var results = []
    fs.createReadStream(`./assets/uploads/${workerData.fileName}`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        await addDB(results)
    });
}

const addDB = async function(results){
    var count = 0
    //for(var i = 0; i < results.length; i++){
    for(var i = 0; i < results.length; i++){
        var obj = results[i];
        
        count = count + 1
        console.log(count + "/" + results.length)
        //console.log(obj)

    //Agent
        var checkAgent = await agentModel.findOne({name: obj["agent"]})
        //console.log(check)
        var agentId = null
        if(checkAgent == null || checkAgent == undefined){
            var agentRec = new agentModel({
                name: obj["agent"]
            })
            try{
                await agentRec.save()
                agentId = agentRec._id
            }
            catch{
                console.log("Error adding agent to DB")
            }
            
        }
        else{
            agentId = checkAgent._id
        }

        //Carrier
        var checkCarrier = await carrierModel.findOne({name: obj["company_name"]})
        //console.log(check)
        var carrierId = null
        if(checkCarrier == null || checkCarrier == undefined){
            var carrierRec = new carrierModel({
                name: obj["company_name"]
            })
            try{
                await carrierRec.save()
                carrierId = carrierRec._id
            }
            catch{
                console.log("Error adding cArrier to DB")
            }
            
        }
        else{
            carrierId = checkCarrier._id
        }


        //User Account Name
        var checkUserAccount = await user_accountModel.findOne({name: obj["account_name"]})
        //console.log(check)
        var userAccountId = null
        if(checkUserAccount == null || checkUserAccount == undefined){
            var userAccountRec = new user_accountModel({
                name: obj["account_name"]
            })
            try{
                await userAccountRec.save()
                userAccountId = userAccountRec._id
            }
            catch{
                console.log("Error adding User Account to DB")
            }
            
        }
        else{
            userAccountId = checkUserAccount._id
        }

        //LOB Details - category_name
        var checkLOB = await lobModel.findOne({name: obj["category_name"]})
        //console.log(check)
        var lobId = null
        if(checkLOB == null || checkLOB == undefined){
            var lobRec = new lobModel({
                name: obj["category_name"]
            })
            try{
                await lobRec.save()
                lobId = lobRec._id
            }
            catch{
                console.log("Error adding Category(LOB) to DB")
            }
            
        }
        else{
            lobId = checkLOB._id
        }

        //User Details
        var checkUser = await userModel.findOne({name: obj["firstname"]})
        //console.log(check)
        var userId = null
        if(checkUser == null || checkUser == undefined){
            var userRec = new userModel({
                name: obj["firstname"],
                dob: new Date(obj["dob"]),
                address: obj["address"],
                phone: obj["phone"],
                state: obj["state"],
                zip: obj["zip"],
                email: obj["email"],
                gender: obj["gender"],
                userType: obj["userType"]
            })
            try{
                await userRec.save()
                userId = userRec._id
            }
            catch{
                console.log("Error adding User to DB")
            }
        }
        else{
            userId = checkUser._id
        }

        //Policy

        var policyRec = new policyModel({
            userId: userId,
            agentId: agentId,
            userAccountId: userAccountId,
            policyNumber: obj["policy_number"],
            startDate: new Date(obj["policy_start_date"]),
            endDate: new Date(obj["policy_end_date"]),
            lobId: lobId,
            companyId: carrierId,
            policyType:obj["policy_type"],
            producer: obj["producer"],
            premiumAmount: obj["premium_amount"],
        })
        try{
            await policyRec.save()
           // userId = userRec._id
        }
        catch{
            console.log("Error adding Policy to DB")
        }
        

        

    }
}
parseAdd()
