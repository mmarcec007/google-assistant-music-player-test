const actionsSdkResponse = require('../../../responses/actions-sdk/actions-sdk');

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
            response = actionsSdkResponse.getSimpleResponse(text, true);
        }
    } else if (conversation.type === 'ACTIVE') {
        if (userInputs) {
            const userRawInputQuery = userInputs[0].rawInputs[0].query;
            if (userRawInputQuery) {
                response = actionsSdkResponse.getSimpleResponse(userRawInputQuery, true);
            }
        }
    }

    actionsSdkResponse.log(req, response);
    resp.send(response);
};