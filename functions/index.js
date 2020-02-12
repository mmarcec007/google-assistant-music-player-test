'use strict';

const functions = require('firebase-functions');
const demoShowcase = require('./impl/actions-sdk/demo/demo-showcase');
const myClub = require('./impl/actions-sdk/my-club');
const myClubDialogFlow = require('./impl/dialogflow/my-club');
const dialogFlow = require('./external-api/dialogflow');
const auth = require('./external-api/authorization');
const alexaResponses = require('./responses/alexa/alexa');

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
        data = await dialogFlow.detectIntent(textToAnalyze, "en-US","kn-vucetinec-1565962572259","adewf1234swdfgs", accessToken);

        if (data === null) {
            console.warn('Could\'t authenticate! I\'m going to analyze raw user input.')
        }
    }

    // if intent is not set the users input will be used as fallback for response
    let detectedIntent = null;
    let parameters = null;
    if (data && data.queryResult && data.queryResult.intent) {
        detectedIntent = data.queryResult.intent.displayName;
        parameters = data.queryResult.parameters;
    } else {
        console.warn("Intent was not found! I'm going to analyze raw user input.");
    }

    req.body.detectedIntent = detectedIntent;
    req.body.parametersOfDetectedIntent = parameters;

    myClub.myClubImpl(req, resp);
});


exports.webhookDialogflow = functions.https.onRequest(async (req,  resp) => {
    myClubDialogFlow.myClubImpl(req, resp)
});

exports.webhookForAlexa = functions.https.onRequest(async (req,  resp) => {
    console.log("Alexa's request body:");
    console.log(req.body);

    // text to analyze is the detected intent provided by amazon request
    let textToAnalyze = req.body.request.intent ? req.body.request.intent.slots.search.value : "Unknown Intent";
    let data = await dialogFlow.detectIntent(textToAnalyze, "en-US", "kn-vucetinec-1565962572259","alexa-adewf1234swdfge", accessToken);

    // if there is no response, the token is not valid
    // then we get a new token and fetch the data once again
    if (data === null) {
        accessToken = await auth.getToken();
        console.log("New token was generated!");
        data = await dialogFlow.detectIntent(textToAnalyze, "en-US","kn-vucetinec-1565962572259","alexa-adewf1234swdfgs", accessToken);

        if (data === null) {
            console.warn('Could\'t authenticate! I\'m going to analyze raw user input.')
        }
    }

    // if intent is not set the users input will be used as fallback for response
    let detectedIntent = null;
    let parameters = null;
    // parameters will be taken form amazon request intent slots
    if (data && data.queryResult && data.queryResult.intent) {
        console.log("Results of Dialogflow intent detection:");
        console.log(data);
        detectedIntent = data.queryResult.intent.displayName;
        parameters = data.queryResult.parameters;
    } else {
        console.warn("Intent was not found! I'm going to analyze raw user input.");
    }

    const result = alexaResponses.getSimpleTestResponse(parameters, detectedIntent, false);

    console.log(result);
    resp.send(result);
});
