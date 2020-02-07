const actionsSdkResponse = require('../../../responses/actions-sdk/actions-sdk');
const jsonExtractor = require('./helper/json-extractor');
const baseSuggestions = require('./data/base-suggestions');
const suggestions = jsonExtractor.getValuesFromJson('suggestions', baseSuggestions);

exports.myClubImpl = (req, resp) => {
    let text = "I couldn't understand that.";
    let response = actionsSdkResponse.getSimpleResponse(text, true);
    const conversation = req.body.conversation;
    const userInputs = req.body.inputs;

    if (conversation.type === 'NEW') {
        text = "Hi there, how can I Assist?";

        // handles the trigger query
        if (userInputs[0].arguments && userInputs[0].arguments[0].name === 'trigger_query') {
            const intent = userInputs[0].intent;
            console.log("Resolved intent: " + intent);

            if (intent === 'actions.intent.TEXT') {
                text = "Please include more than one intents in you actions package!";
                response = actionsSdkResponse.getSimpleResponse(text, false)
            } else {
                if (intent === 'com.mark.dev.MATCH_RESULTS') {
                    text = "Here are the results of the following match:";
                    response = actionsSdkResponse.getTableResponse(text);
                } else if (intent === 'com.mark.dev.MATCHES') {
                    text = "Here are the requested matches:";
                    response = actionsSdkResponse.getTableResponse(text);
                } else {
                    text = "Unknown trigger query. Please try again later!";
                    response = actionsSdkResponse.getSimpleResponse(text, false)
                }
            }
        }
        // otherwise add a greeting message
        else {
            response = actionsSdkResponse.getSuggestionsResponse(text, suggestions);
        }
    } else if (conversation.type === 'ACTIVE') {
        if (userInputs) {
            const userRawInputQuery = req.body.detectedIntent !== null ?
                req.body.detectedIntent.toLowerCase() : userInputs[0].rawInputs[0].query.toLowerCase();
            const intent = userInputs[0].intent;
            const params = req.body.parametersOfDetectedIntent;
            if (suggestions[0].title.toLowerCase() === userRawInputQuery) {
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
                response = actionsSdkResponse.getTableResponse(text);
            } else if (suggestions[1].title.toLowerCase() === userRawInputQuery) {
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
                response = actionsSdkResponse.getTableResponse(text);
            } else if (userRawInputQuery === 'back') {
                text = "Is there anything else?";
                response = actionsSdkResponse.getSuggestionsResponse(text, suggestions);
            }  else {
                text = "I didn't understand that. Please choose something from the suggestions.";
                response = actionsSdkResponse.getSuggestionsResponse(text, suggestions);
            }

            if (intent === 'actions.intent.CANCEL') {
                response = actionsSdkResponse.getSimpleResponse("Ok, have a nice day.", false);
            }
        }
    }

    actionsSdkResponse.log(req, response);
    resp.send(response);
};