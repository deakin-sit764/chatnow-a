const express = require('express');
const app = express();

//Add a path DialogFlowAccessAPI
const DialogflowAPI = require('./DialogflowClientAccessAPI/query.js');
require('dotenv').config({silent: true});
app.use(express.static('public'));

//Set the project ID and session //
const projectId = process.env.PROJECT_ID;
const sessionId = process.env.SESSION_ID;

// Get the client bot to the do calls
let DialogFlowBot = new DialogflowAPI(projectId,sessionId);

//POST routes for handling requests from client
// /Dialogflow/query?question=hello%20World
app.post('/Dialogflow/query', function(req, res) {
  try {
    var question = req.param('question');
    DialogFlowBot.GetReplyFromDialogflow(question,function(response) {
      res.send("Answer recevied = " + response);
    });

    }
  catch(e) {
    res.send('Error while processing POST:' + e);
  }
})

var server = require('./app');

app.listen(process.env.PORT || 8080, () => console.log("Running Good!"));
