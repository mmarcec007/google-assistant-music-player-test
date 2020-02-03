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

const mp3Files = [
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/01-freeky.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/02-hot.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/02-kitty-doesnt-like-320kbps.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/03-shit.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/03-talking-kitty-cat-stupid-stupid-world-320kbps.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/04-nowhere-az-few-far-between-320kbps.mp3",
    "https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3"
];
let currentIndex = 0;
exports.dialogFlowWebhook = functions.https.onRequest((req, resp) => {
    let result = dialogFlowResponse.getSimpleResponse("I don't understand you well.", true);
    const conversation = req.body.originalDetectIntentRequest.payload.conversation;

    if (conversation.type === 'NEW') {
        result = dialogFlowResponse.getSimpleResponse("Hi there! Welcome to Custom Music Player on Dialogflow.", true);
    } else if (conversation.type === 'ACTIVE') {
        const userInput = req.body.queryResult.queryText;
        const detectedIntent = req.body.queryResult.intent;


        if (detectedIntent.displayName === "Media") {
            result = dialogFlowResponse.getMediaResponse("Here you go:", mp3Files[currentIndex]);
        } else if (detectedIntent.displayName === "Next") {
            console.log("Next");
            currentIndex++;
            if (currentIndex >= mp3Files.length) {
                currentIndex = 0;
            }
            result = dialogFlowResponse.getMediaResponse("Playing next title:", mp3Files[currentIndex]);
        } else if (detectedIntent.displayName === "Previous") {
            currentIndex++;
            if (currentIndex <= mp3Files.length) {
                currentIndex = 0;
            }
            result = dialogFlowResponse.getMediaResponse("Playing previous title:", mp3Files[currentIndex]);
            console.log("Previous");
        } else {
            result = dialogFlowResponse.getSimpleResponse(userInput, true);
        }
    }
    dialogFlowResponse.log(req, result);
    resp.send(result);
});

exports.dialogFlowMessengerWebhook = functions.https.onRequest((req, resp) => {
    resp.send("someTestEcho")
});