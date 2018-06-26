 express = require('express');
 app = express();
 http = require('http').Server(app);;
 https = require('https');
 mongodb = require("mongodb");
 request = require("request");
 bodyParser = require("body-parser");
 path = require("path");
 cors = require('cors');
 schedule = require('node-schedule');
 mongoClient = mongodb.MongoClient;

  

 var ReminderRouter = require('./ReminderRouter').ReminderRouter;
 
      
 
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors()); // CORS (Cross-Ori gin Resource Sharing) headers to support Cross-site HTTP requests
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//REMINDER PATH
app.use("/reminder", ReminderRouter);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
 // app.emit("appStarted");
});


module.exports = {
  app
}

