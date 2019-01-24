# Purpose: To extract user queries that the chatbot did not understand
# Will output a text document containing the user queries
# I follow the example in this site https://bruceelgort.com/2014/03/20/mongodb-and-python-a-simple-example/
# Need to have pymongo installed in order to use this script, 
# follow the instructions in here https://api.mongodb.com/python/current/installation.html
 
from pymongo import MongoClient
 
# connect to the MongoDB on MongoLab
connection = MongoClient("mongodb://chatnow_demo:chatnow2019!@ds053305.mlab.com:53305/chatbot_session")
 
# connect to the chatbot_session database and the session collection
db = connection.chatbot_session.session
 
# Dialogflow's list of replies when chatbot cannot understand the user questions/intent
errors = ["I didn't get that. Can you say it again?","I missed what you said. What was that?","Sorry, could you say that again?",
"Sorry, can you say that again?","Can you say that again?","Sorry, I didn't get that. Can you rephrase?","Sorry, what was that?",
"One more time?","What was that?","Say that one more time?","I didn't get that. Can you repeat?","I missed that, say that again?",
"I am not sure I understand that. Can you try asking in a different way?"]
 
# find all documents
documents = db.find()

# Create a text document for the output
file =open("unanswered_user_queries.txt","w")

file.write("User's input that the chatbot did not understand will start below:\n")


# display documents from collection
for document in documents:
    i=0
    while i < len(document['conversation']):
        if document['conversation'][i]['chatbotResponse'] in errors:
            file.write("*********************************************\n")
            if( (i-1) > -1 ):
                file.write("Chatbot: "+ document['conversation'][i-1]['chatbotResponse']+"\n")
            else:
                file.write("There is no previous chatbot response \n")
            
            file.write("User: "+ document['conversation'][i]['userInput']+"\n")
            file.write("Chatbot: "+ document['conversation'][i]['chatbotResponse']+"\n")
        i += 1
 

# close the file
file.close()
print("Please open unanswered_user_queries.txt to see the user queries")
# close the connection to MongoDB
connection.close()