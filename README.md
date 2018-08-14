# chatnow-a
Team project for SIT764 to develop sophisticated chatbot that can enhance the customer experience across the NOW FINANCE business. The
idea behind our chatbot is that once enabled it will be able to help customer make better decisions about what product they need to apply
for from the website and can also guide customers through the various aspects of business. Our chatbot will also be integrated on the common
social media channels such Facebook Messenger, Slack, Viber etc.

## Trying our Prototype Chatbots
Our project website is located at https://chatnow-a.herokuapp.com/# where we currently have demos for two Chatbots
using two distince technologies. One technology is Google Dialogflow and the other one is IBM Watson. We have trained
our bots using FAQs from the Now Finance website and have also used variations of same FAQ to train properl;y train
bot to recognise intents more effectively and get better at answering user's questions.

## Project Layout
The main project resides in the chatnow-a folder where the main NodeJS server powers the applications.
The website HTML files are in public folder.

## Design Details for Dialogflow Chabot
We have used our libraries that reside in the DialogFlowAccessAPI folder to access Dialogflow API. Server receives
clients request as a POST request and asynchronously generates a matched answer by sending the question to DialogflowAPI.
Dialogflow API Keys and authentications reside on Heroku server's environment variables.  

##*TODO Implement and integerate IBM Watson Chatbot*
