'use strict';

const functions = require('firebase-functions');
const demoShowcase = require('./impl/actions-sdk/demo/demo-showcase');
const myClub = require('./impl/actions-sdk/my-club');
const dialogFlowResponse = require('./responses/dialogflow/dialogflow');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.webhook = functions.https.onRequest((req, resp) => {
    // demoShowcase.demoImpl(req, resp);
    myClub.myClubImpl(req, resp);
});

exports.dialogFlowWebhook = functions.https.onRequest((req, resp) => {
    let result = dialogFlowResponse.getSimpleResponse("I don't understand you well.", true);
    const conversation = req.body.originalDetectIntentRequest.payload.conversation;

    if (conversation.type === 'NEW') {
        result = dialogFlowResponse.getSimpleResponse("Hi there! Welcome to Custom Music Player on Dialogflow.", true);
    } else if (conversation.type === 'ACTIVE') {
        result = dialogFlowResponse.getSimpleResponse("Lets play some music!", true);
    }

    resp.send(result);
});
