'use strict';

const functions = require('firebase-functions');
const demoShowcase = require('./impl/actions-sdk/demo/demo-showcase');
const myClub = require('./impl/actions-sdk/my-club');
const dialogFlow = require('./external-api/dialogflow');
const auth = require('./external-api/authorization');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

let accessToken = "";

exports.webhook = functions.https.onRequest(async (req,  resp) => {
    // demoShowcase.demoImpl(req, resp);
    const userInputs = req.body.inputs;
    const textToAnalyze = userInputs[0].rawInputs[0].query;

    let data = await dialogFlow.detectIntent(textToAnalyze, "en-US", "kn-vucetinec-1565962572259","adewf1234swdfge", accessToken);

    // if there is no response, the token is not valid
    // then we get a new token and fetch the data once again
    if (data === null) {
        accessToken = await auth.getToken();
        console.log("New token was generated!");
        data = await dialogFlow.detectIntent(textToAnalyze, "en-US","kn-vucetinec-1565962572259","adewf1234swdfgs", accessToken)
    }

    // if intent is not set the users input will be used as fallback for response
    let detectedIntent = null;
    if (data && data.queryResult) {
        detectedIntent = data.queryResult.intent.displayName;
    }

    req.body.detectedIntent = detectedIntent;

    myClub.myClubImpl(req, resp);
});