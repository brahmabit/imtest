const mongoConnectionString = 'mongodb+srv://imtest:imtest@cluster0.usbzk.mongodb.net/imtest_agenda';
const Agenda = require('agenda');
const messageModel = require('../models/message.model');

//const agenda = new Agenda({db: {address: mongoConnectionString}});
const agenda = new Agenda({
    db: {address: mongoConnectionString, collection: 'imtest_agenda'},
    processEvery: '10 seconds'
});

agenda.define("add messageDb", async (job) => {
    console.log("The job has started , adding to db..............")
    var rec = new messageModel({
        message: job.attrs.data.message,
    })
    await rec.save();
  });
  
  agenda.start();
 
  var dayDict = {'monday':1, 'tuesday':2, 'wednesday':3, 'thursday':4, 'friday':5, 'saturday':6, 'sunday':0}
  const addMessage = async (req, res) => {
    var dayNum = 0
    var hourNum = 0 
    var minuteNum = 0
    if(req.body.day){
        dayNum = dayDict[req.body.day]
    }
    if(req.body.time){
        //format ---> HH:MM (24hrs clock)
        var time = req.body.time
        var timeSplit = time.split(':')
        hourNum = timeSplit[0]
        minuteNum = timeSplit[1]
    }
    var cronFormatString = `${minuteNum} ${hourNum} * * ${dayNum}`
    console.log(cronFormatString)

    // Since it was mentioned to schedule for day and not date
    // I will make it a repeating task for every week-
    // Note - we can make in a  single run/unique very easily
    //use schedule if  ^
    try {
        await agenda.every(cronFormatString, "add messageDb", req.body)
    } catch (e) {
        var jsonResp = {}
            jsonResp.error = e
            jsonResp.Success = false
            res.status(400).send(jsonResp)
    }

    var jsonResp = {}
        jsonResp.Data = "Scheduled"
        jsonResp.Success = true
        res.status(200).send(jsonResp)
   
  };

  module.exports = {
    addMessage,
  };