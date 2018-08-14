// Function to start the IBM Watson chatbot widget
    function startWatsonChat() {

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/Dialogflow/query', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
      };
      xhr.send('question=hello');
    }
