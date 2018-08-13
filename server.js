const express = require('express');
const app = express();

app.use('/watson-assistant', express.static('WatsonAssistantDemo'));

app.use(express.static('public'));
app.listen(process.env.PORT || 8080, () => console.log("Running Good!"));
