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

// a Function to Add hyperlinks
AddLinks = function(s){

  let startofLink = s.indexOf("http");
  if(startofLink === -1) return s;
  let endofLink = s.lastIndexOf("/");
  let link = s.slice(startofLink,endofLink+1);
  let newlink = '<a href="'+link+'">'+link+'</a>';
  let newstring = s.replace(link,newlink);

  return newstring;
}

// POST routes for handling requests from client
// This route is handling requests from the client using the following
// URL format: Dialogflow/query?question=hello%20World
// question--> is what the client will be sending as an input to the chatbot
// reponse--> This is what we get as response from Dialogflow
// TODO: Add more error checking and status checking for the client
app.post('/Dialogflow/query', function(req, res) {
  try {
    var question = req.body.question;
    if(Debug) console.log("Question received = " + question);
    DialogFlowBot.GetReplyFromDialogflow(question,function(response) {
      let s = AddLinks(response);
      res.send(s);
    });

    }
  catch(e) {
    res.send('[Error Receiving response from Dialogflow in server:]' + e + '/n');
  }
})

var server = require('./watsonassistantapp')(app);

app.listen(process.env.PORT || 8080, () => console.log("Running Good!"));
