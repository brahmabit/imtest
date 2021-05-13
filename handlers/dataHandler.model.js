const agentModel = require('../models/agent.model')

const mongoose = require('mongoose')
const carrierModel = require('../models/carrier.model')
const lobModel = require('../models/lob.model')
const policyModel = require('../models/policy.model')
const user_accountModel = require('../models/user_account.model')
const userModel = require('../models/user.model')

const getUserPolicyAggregated = async (req, res) => {
    userModel.aggregate([
        {
           $lookup: {
               from: "policyDetails", 
               localField: "_id",
               foreignField: "userId",
               as: "policies"
           }
       },
        {
        $unwind: "$policies"
        },
        {
           $lookup: {
               from: "carrierDetails", 
               localField: "policies.companyId",
               foreignField: "_id",
               as: "policies.company_detail"
           }
       },
       {
           $lookup: {
               from: "agentDetails", 
               localField: "policies.agentId",
               foreignField: "_id",
               as: "policies.agent_detail"
           }
       },
       {
        $lookup: {
                from: "userAccount", 
                localField: "policies.userAccountId",
                foreignField: "_id",
                as: "policies.account_name"
            }
       }, // Pagination
       { $skip: parseInt(req.query.start) }, 
       {$limit: parseInt(req.query.limit)}
   ], function (error, data) {
       
        var dataSent = JSON.parse(JSON.stringify(data))
        if(error){
            var jsonResp = {}
               jsonResp.error = error
               jsonResp.Success = false
               res.status(400).send(jsonResp)
        }
        var jsonResp = {}
        jsonResp.Data = dataSent
        jsonResp.Success = true
        res.status(200).send(jsonResp)
    })
}

const getUserPolicyByName = async (req, res) => {
    userModel.aggregate([
        {
            //TAsk 1 -> 3) API to provide aggregated policy by each user. Cna be created here by adding or condition
            //in the match to query for a single user.
            $match:
            {
                name:{$regex:req.query.SearchString, $options: "i"}
            } 
        },
        {
           $lookup: {
               from: "policyDetails", 
               localField: "_id",
               foreignField: "userId",
               as: "policies"
           }
       }, 
       {
        $unwind: "$policies"
        },
       {
           $lookup: {
               from: "carrierDetails", 
               localField: "policies.companyId",
               foreignField: "_id",
               as: "company_detail"
           }
       },
       {
           $lookup: {
               from: "agentDetails", 
               localField: "policies.agentId",
               foreignField: "_id",
               as: "agent_detail"
           }
       },
       {
        $lookup: {
                from: "userAccount", 
                localField: "policies.userAccountId",
                foreignField: "_id",
                as: "account_name"
            }
       }, //Unknown Pagination.......
       //{ $skip: req.query.start }, 
       //{$limit: req.query.limit}
   ], function (error, data) {

        var dataSent = JSON.parse(JSON.stringify(data))
        if(error){
            var jsonResp = {}
            jsonResp.error = error
            jsonResp.Success = false
            res.status(400).send(jsonResp)
        }
        var jsonResp = {}
        jsonResp.Data = dataSent
        jsonResp.Success = true
        res.status(200).send(jsonResp)
    })
}

module.exports = {
    getUserPolicyAggregated,
    getUserPolicyByName
  };