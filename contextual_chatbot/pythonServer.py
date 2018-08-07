from flask import (
    Flask,
)

#import the code for chatbot
from tensorflow_chatbot import *

# Create the application instance
app = Flask(__name__)
# Create a URL route in our application for "query"
@app.route('/query/<question>')
def query(question):
    #Get a response from chatbot
    print("Question received = " + question)
    res = response(question)
    #Printing the repsone to console just for debugging purposes
    print("Response generated = " + res)
    return res

# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(debug=True)
