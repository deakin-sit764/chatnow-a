const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Debug = process.env.DEBUG;

//Add a path DialogFlowAccessAPI
const DialogflowAPI = require('./DialogflowClientAccessAPI/query.js');
require('dotenv').config({silent: true});
app.use(express.static('public'));
//set body-parser for processing POST route
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Set the project ID and session //
const projectId = process.env.PROJECT_ID;
const sessionId = process.env.SESSION_ID;

// Get the client bot to the do calls
let DialogFlowBot = new DialogflowAPI(projectId,sessionId);

//POST routes for handling requests from client
// /Dialogflow/query?question=hello%20World
app.post('/Dialogflow/query', function(req, res) {
  try {
    var question = req.body.question;
    if(Debug) console.log("Question received = " + question);
    DialogFlowBot.GetReplyFromDialogflow(question,function(response) {
      res.send(response);
    });

    }
  catch(e) {
    res.send('ERROR:' + e);
  }
})

var server = require('./app');

app.listen(process.env.PORT || 8080, () => console.log("Running Good!"));
