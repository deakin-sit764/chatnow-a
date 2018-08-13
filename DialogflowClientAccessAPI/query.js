const dialogflow = require('dialogflow');
//Flag for printing debugging information
const LOGYES = true;

//Custom defined Dialogflow class for encapsulating access to DialogFlow API
class DialogFlow {
  constructor (projectId,sessionId) {
    //Set the project and session Ids
    this.projectId = projectId;
    this.sessionId = sessionId;
    this.languageCode = 'en-US';
    //Get a new DialogflowClient
    this.sessionClient = new dialogflow.SessionsClient();
    // Define session path
    this.sessionPath = this.sessionClient.sessionPath(this.projectId, this.sessionId);
  }

  async GetReplyFromDialogflow(question){
    // The text query request.
    let request = {
      session: this.sessionPath,
      queryInput: {
        text: {
          text: question,
          languageCode: this.languageCode,
        },
      },
    };
    // Send request and log result
    this.sessionClient
      .detectIntent(request)
      .then(responses => {
        const result = responses[0].queryResult;
        if(LOGYES) {
         console.log('Detected intent');
         console.log(`  Query: ${result.queryText}`);
         console.log(`  Response: ${result.fulfillmentText}`);
         return result.fulfillmentText;
      }

      })
      .catch(err => {
        if (LOGYES) console.error('ERROR:', err);
        throw err;
      });
  }
}

let DialogFlowBot = new DialogFlow('myfirstagent-73433','quickstart-session-id');

try {
  let res =  DialogFlowBot.GetReplyFromDialogflow('Good evening?');
  console.log("Response = " + res);
}
catch(e) {
  console.error('ERROR:', e)
}
