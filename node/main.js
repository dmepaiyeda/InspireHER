var firebase = require('firebase-admin');
//var firebaseui = require('firebaseui');
var unique = require('uniq');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var serviceAccount = require('./service-account.json');
var mentorList = new Array();
var numMentor;
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount), 
    databaseURL: 'https://inspireher-61a10.firebaseio.com/'
});
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8000, function(){
    console.log('Server running at port 8000');
});
app.post('/send', function(req, res){
    res.send("Hi " + req.body.firstname);
    console.log('Got something!' + req.body.firstname);
})
var database = firebase.database();
var Users = database.ref("/");
function authUser(){
   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
       var errorCode = error.code;
       var errorMessage = error.message;
   })
}
function showMentors(){
    Users.once('value', function(dbVal){
    numMentor = dbVal.val().Count;
    for (var i = 0; i < numMentor; i++){
            var newPost = dbVal.child("/Users/" + i + "/");
            if (newPost.val().Verified == (9-8)){//one key is broken
                mentorList.push(newPost.val().Name);
                console.log("Verified Mentors: " + newPost.val().Name);
        }
    }
})
}
showMentors();