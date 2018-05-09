const {google} = require('googleapis');
const util = require('util');
const CircularJSON = require('circular-json');
const axios = require('axios');

const CLIENT_ID = '334188807296-t4d4140t32jva0t1l44ab743q9iasbpp.apps.googleusercontent.com';
const CLIENT_SECRET = '5CKYXirAJ5j69_e1dLYZvZfU';
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
  'http://localhost:3000'
);

// generate a url that asks permissions for Google+ and Google Calendar scopes


var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

var cors = require('cors')
var bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());

app.post('/auth', async function (req, res, next) {
    console.log(req.body.token.code);
    const token = await oauth2Client.getToken(req.body.token.code).then((result)=>{
      
        res.type('text/json').send(CircularJSON.stringify(result));
        oauth2Client.setCredentials(result);
    }).catch((err) => {
        console.log(err);
    })
    
})

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001')
})


app.post('/api/auth/refreshToken', async (req, res, next) => {
    await axios.post(`https://www.googleapis.com/oauth2/v4/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${req.body.token}&grant_type=refresh_token`).then((response) => {
         console.log(response);   
        if(response){
            res.type('text/json').send(CircularJSON.stringify(response));
        }
    }).catch((err) => {
        console.log(err);
    });

})

