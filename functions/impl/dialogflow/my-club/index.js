const dialogflowResponse = require('../../../responses/dialogflow/dialogflow');
const jsonExtractor = require('../../core/helper/json-extractor');
const baseSuggestions = require('../../core/data/base-suggestions');
const suggestions = jsonExtractor.getValuesFromJson('suggestions', baseSuggestions);

exports.myClubImpl = (req, resp) => {
    let text = "I couldn't understand that.";
    let response = dialogflowResponse.getSimpleResponse(text, true);

    const conversation = req.body.originalDetectIntentRequest.payload.conversation;
    const userInputs = req.body.originalDetectIntentRequest.payload.inputs;

    if (conversation.type === 'NEW') {
        text = "Hi there, how can I Assist?";
        response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
    } else if (conversation.type === 'ACTIVE') {
        if (userInputs) {
            const detectedIntentName = req.body.queryResult.intent.displayName.toLowerCase();
            const params = req.body.queryResult.parameters;
            if (suggestions[0].title.toLowerCase() === detectedIntentName) {
                text = "Here are the results of the following match:";
                if (params !== null && params["date-period"]) {
                    const datePeriodParam = params["date-period"];
                    text = "Here are the following following results of played matches from " + datePeriodParam.startDate + " to " + datePeriodParam.endDate;
                } else if (params !== null && params["date"]) {
                    const dateParam = params["date"];
                    text = "Here are the results of the following matches for the following date " + dateParam;
                } else if (params !== null && params["LastMatch"]) {
                    const lastMatchParam = params["LastMatch"];
                    if (lastMatchParam === "true") {
                        // todo prepare the data of the last match's results
                        text = "Here are the results of the last match " + lastMatchParam;
                    }
                }
                response = dialogflowResponse.getTableResponse(text);
            } else if (suggestions[1].title.toLowerCase() === detectedIntentName) {
                text = "Here are the requested matches:";
                if (params !== null && params["date-period"]) {
                    const datePeriodParam = params["date-period"];
                    text = "Here are the following matches from " + datePeriodParam.startDate + " to " + datePeriodParam.endDate;
                } else if (params !== null && params["date"]) {
                    const dateParam = params["date"];
                    text = "Here are the following matches for the following date " + dateParam;
                } else if (params !== null && params["number"]) {
                    const numberParam = params["number"];
                    text = "Here is the following match with ID of " + numberParam;
                } else if (params !== null && params["LastMatch"]) {
                    const lastMatchParam = params["LastMatch"];
                    if (lastMatchParam === "true") {
                        // todo prepare the data of the last match
                        text = "Here is the last match " + lastMatchParam;
                    }
                } else if (params !== null && params["NextMatch"]) {
                    const nextMatchParam = params["NextMatch"];
                    if (nextMatchParam === "true") {
                        // todo prepare the data of the last match
                        text = "Here is the next match " + nextMatchParam;
                    }
                }
                response = dialogflowResponse.getTableResponse(text);
            } else if (detectedIntentName === 'back') {
                text = "Is there anything else?";
                response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
            }  else {
                text = "I didn't understand that. Please choose something from the suggestions.";
                response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
            }
        }
    }

    dialogflowResponse.log(req, response);
    resp.send(response);
};