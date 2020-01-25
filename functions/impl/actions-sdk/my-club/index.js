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
            response = actionsSdkResponse.getTableResponse("Here are the results of the following match:");
        } else {
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