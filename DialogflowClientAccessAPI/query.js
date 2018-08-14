//Flag for printing debugging information
const LOGYES = false;
const dialogflow = require('dialogflow');
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

  GetReplyFromDialogflow(question, callback){
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
      }
      callback(result.fulfillmentText);
      })
      .catch(err => {
        if (LOGYES) console.error('ERROR:', err);
        throw err;
      });
  }
}

module.exports = DialogFlow;
