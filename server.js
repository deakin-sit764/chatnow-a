const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Debug = process.env.DEBUG;
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const googleStrategy = require('passport-google-oauth20');

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

// Single Sign-On using passport.js through Facebook login
// The following code is base on the facebook strategy example created by
// jaredhanson, the code can be found here https://github.com/passport/express-4.x-facebook-example


// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'https://chatnow-a-sit782-t32018.herokuapp.com/facebook/return',
  profileFields: ['id', 'displayName', 'photos', 'email']
},

function(accessToken, refreshToken, profile, cb) {
  // In this example, the user's Facebook profile is supplied as the user
  // record.  In a production-quality application, the Facebook profile should
  // be associated with a user record in the application's database, which
  // allows for account linking and authentication with other identity
  // providers.
  return cb(null, profile);
}));

passport.use(new googleStrategy({
clientID: process.env.CLIENT_ID1,
clientSecret: process.env.CLIENT_SECRET1,
callbackURL: 'https://chatnow-s.herokuapp.com/google/callback',
profileFields: ['id', 'displayName', 'photos', 'email']
},

(accessToken, refreshToken, profile, cb) => {
  console.log ('callback function fired');
  console.log(profile);
  return cb(null, profile);
}));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


//---------------------- ROUTING ---------------//

// Define routes for facebook.

app.get('/',(req, res) => {
    res.render('index', { user: req.user });
  });

app.get('/logout/facebook',
  function(req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

//define routes for google

app.get('/logout/google',(req, res) => {
    req.logout();
    res.redirect('/');
});
app.get('/login/google',passport.authenticate('google',{
    scope: ['profile']
  }));

app.get('/google/callback', passport.authenticate('google',{ failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/');
    res.send('logged in with google');
  });


app.listen(process.env.PORT || 8080, () => console.log("Running Good!"));
