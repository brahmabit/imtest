const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.disable('x-powered-by')
var os 	= require('os-utils');


global.__basedir = __dirname;


try {
  mongoose.connect('mongodb+srv://imtest:imtest@cluster0.usbzk.mongodb.net/imtest?retryWrites=true&w=majority', { useNewUrlParser: true })
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
} catch (e) {
  console.log(e)
}
app.use(cors());
var uploadRoute = require("./routes/upload.route")
var fetchData = require("./routes/fetchData.route")
var message = require("./routes/scheduler.route")

//const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));

//initRoutes(app);
app.use('/upload', uploadRoute)
app.use('/fetchData', fetchData)
app.use('/message', message)

let port = 7002;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var compFunction = async function(){
  var ans = 1.1
  for(var i = 0; i < 50000; i++){
    ans = ans* 1.1
    console.log(ans)
  }
}
var cpuCheck = async function(){
  
  while(true){
    os.cpuUsage(function(v){
      console.log( 'CPU Usage (%): ' + v );
      if(v>0.7){
        console.log("This is pid " + process.pid);
        setTimeout(function () {
        process.on("exit", function () {
        require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached : true,
            stdio: "inherit"
        });
    });
    process.exit();
}, 5000);
      }
    });
    await sleep(1000)

  }
}

cpuCheck()
//compFunction()
/*

*/