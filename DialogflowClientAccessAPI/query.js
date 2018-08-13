// You can find your project ID in your Dialogflow agent settings
const projectId = 'myfirstagent-73433';
const sessionId = 'quickstart-session-id';
const query = 'What is your interest rate?';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();


class DialogFlow {

  constructor (projectId,sessionId) {
    //Set the project and session Ids
    this.projectId = projectId;
    this.sessionId = sessionId;
    this.languageCode = 'en-US';

    //Get a new DialogflowClient
    this.sessionClient = new dialogflow.SessionsClient();
    // Define session path
    this.sessionPath = sessionClient.sessionPath(this.projectId, this.sessionId);
  }

  async GetReplyFromDialogflow(question){
    


  }


}



// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
