const dialogflowResponse = require('../../../responses/dialogflow/dialogflow');
const jsonExtractor = require('../../core/helper/json-extractor');
const baseSuggestions = require('../../core/data/base-suggestions');
const firebaseJson = require('../../../external-api/firebaseJson');
const suggestions = jsonExtractor.getValuesFromJson('suggestions', baseSuggestions);

exports.myClubImpl = async (req, resp) => {
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
            } else if (suggestions[2].title === detectedIntentName) {
                const data = await firebaseJson.getTeams();

                console.log("Printing data of teams: ");
                console.log(data);
                if (data) {
                    text = "Here are the teams:";
                    const teamsData = data.api.teams.slice(0, 29).map((team) => {
                        return {
                            optionInfo: {
                                key: team.team_id,
                                synonyms: [team.name]
                            },
                            title: team.name,
                            description: team.venue_name,
                            image: {
                                url: team.logo,
                                accessibilityText: team.name
                            }
                        }
                    });
                    response = dialogflowResponse.getListResponse(text, "Teams", teamsData);
                } else {
                    text = "Something went wrong! Please try again.";
                    response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
                }
            } else if (detectedIntentName === 'back') {
                text = "Is there anything else?";
                response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
            } else if (detectedIntentName === "DefaultFallbackIntent".toLowerCase() && userInputs[0].intent === 'actions.intent.OPTION') {
                console.log("Action System Intent: ");
                console.log(userInputs[0].intent);

                let teamID = -1;
                if (userInputs[0].arguments[0].name === 'OPTION') {
                    teamID = parseInt(userInputs[0].arguments[0].textValue, 10);
                }

                if (teamID > 0) {
                    const team = await firebaseJson.getTeam(teamID);
                    console.log("Here is the requested team: ");
                    console.log(team);
                    const singleItem = {
                        title: team.name,
                        subtitle: team.venue_name,
                        formattedText: "More Details: " + " \n "
                            + " \n Country: " + "***"+ team.country+"***" + " \n "
                            + " \n Founded: " + "***"+ team.founded+"***" + " \n "
                            + " \n Surface: " + "***"+ team.venue_surface+"***" + " \n "
                            + " \n Address: " + "***"+ team.venue_address+"***" + " \n "
                            + " \n City: " + "***"+ team.venue_city+"***" + " \n "
                            + " \n Capacity: " + "***"+ team.venue_capacity+"***" + " \n ",
                        image: {
                            url: team.logo,
                            accessibilityText: team.name
                        },
                        buttons: [
                            {
                                title: "This is a button",
                                openUrlAction: {
                                    url: "https://assistant.google.com/"
                                }
                            }
                        ],
                    };
                    text = "Got value " + userInputs[0].arguments.textValue;
                    response = dialogflowResponse.getBasicCardResponse(text, singleItem);
                }
            }  else {
                text = "I didn't understand that. Please choose something from the suggestions.";
                response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
            }
        }
    }

    dialogflowResponse.log(req, response);
    resp.send(response);
};