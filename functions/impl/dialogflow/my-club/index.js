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
                text = "Here are the results for England:";
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
                // todo add new api call to fixtures
                const data = await firebaseJson.getFinishedFixtures();
                if (data) {
                    console.log("Getting results...");
                    console.log(data);
                    const tableHeader = ["Home Team", "Away Team", "Score Home", "Score Away", "Venue", "Datetime"].map(item => {
                        return {
                            header: item,
                            horizontalAlignment: "CENTER"
                        }
                    });
                    const tableRows = data.map((fixture) => {
                        return {
                            cells: [
                                {
                                    text: fixture.homeTeam.team_name
                                },
                                {
                                    text: fixture.awayTeam.team_name
                                },
                                {
                                    text: fixture.goalsHomeTeam.toString()
                                },
                                {
                                    text: fixture.goalsAwayTeam.toString()
                                },
                                {
                                    text: fixture.venue
                                },
                                {
                                    text: fixture.event_date
                                }
                            ],
                            "dividerAfter": true
                        }
                    });

                    const tableCard =  {
                        "title": "Results of the matches for England",
                        "subtitle": "Table Subtitle",
                        "image": {
                            "url": "https://avatars0.githubusercontent.com/u/23533486",
                            "accessibilityText": "Actions on Google"
                        },
                        "columnProperties": tableHeader,
                        "rows": tableRows,
                        "buttons": [
                            {
                                "title": "Button Title",
                                "openUrlAction": {
                                    "url": "https://github.com/actions-on-google"
                                }
                            }
                        ]
                    };
                    response = dialogflowResponse.getTableResponse(text, tableCard);
                } else {
                    text = "Something went wrong! Please try again.";
                    response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
                }
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
            } else if (suggestions[2].title.toLowerCase() === detectedIntentName) {
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
            } else if (suggestions[3].title.toLowerCase() === detectedIntentName) {
                const data = await firebaseJson.getCountries();

                if (data) {
                    const tableHeader = ["Code", "Name"].map(item => {
                        return {
                            header: item,
                            horizontalAlignment: "CENTER"
                        }
                    });
                    const tableRows = data.api.countries.map((country) => {
                        return {
                            cells: [
                                {
                                    text: country.country.toLowerCase() === "world" ? "W" : country.code
                                },
                                {
                                    text: country.country
                                }
                            ],
                            "dividerAfter": true
                        }
                    });

                    const tableCard =  {
                        "title": "Countries",
                        "subtitle": "Available countries",
                        "image": {
                            "url": "https://avatars0.githubusercontent.com/u/23533486",
                            "accessibilityText": "Actions on Google"
                        },
                        "columnProperties": tableHeader,
                        "rows": tableRows,
                        "buttons": [
                            {
                                "title": "Button Title",
                                "openUrlAction": {
                                    "url": "https://github.com/actions-on-google"
                                }
                            }
                        ]
                    };

                    console.log("Printing countries data...");
                    console.log(data.api.countries);

                    text = "Displaying countries: ";
                    response = dialogflowResponse.getTableResponse(text, tableCard);
                } else {
                    text = "Something went wrong! Please try again.";
                    response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
                }
            } else if (suggestions[4].title.toLowerCase() === detectedIntentName) {
                const data = await firebaseJson.getLeagues();

                if (data) {
                    text = "Displaying leagues of England";

                    const leaguesData = data.api.leagues.slice(0, 9).map((league) => {
                        return {
                            optionInfo: {
                                key: league.league_id,
                                synonyms: [league.name]
                            },
                            title: league.name,
                            description: "League of " + league.country + ", season period " +  league.season_start + " - " + league.season_end,
                            image: {
                                url: league.logo ? league.logo : "https://media.api-football.com/flags/gb.svg",
                                accessibilityText: league.name
                            }
                        }
                    });
                    response = dialogflowResponse.getCarouselResponse(text, leaguesData)
                } else {
                    text = "Something went wrong! Please try again.";
                    response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
                }
            } else if (detectedIntentName === 'back') {
                text = "Is there anything else?";
                response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
            } else if (detectedIntentName === "DefaultFallbackIntent".toLowerCase() && userInputs[0].intent === 'actions.intent.OPTION') {
                const outputContexts = req.body.queryResult.outputContexts;

                console.log("Analyzing output context...");
                console.log(outputContexts);

                const targetOutputContext = outputContexts.filter(item => {
                    return item.name.includes("_selection_type");
                })[0];

                console.log("Printing target output context...");
                console.log(targetOutputContext);
                const selectionType = targetOutputContext.data;
                console.log("Retrieved selection type...");
                console.log(selectionType);

                console.log("Action System Intent: ");
                console.log(userInputs[0].intent);

                let selection = -1;
                if (userInputs[0].arguments[0].name === 'OPTION') {
                    selection = parseInt(userInputs[0].arguments[0].textValue, 10);
                }

                if (selection > 0 && selectionType.includes('teams')) {
                    const team = await firebaseJson.getTeam(selection);
                    if (team) {
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
                        text = "Got team with name " + team.name;
                        response = dialogflowResponse.getBasicCardResponse(text, singleItem);
                    }
                } else {
                    text = "Couldn't find by ID! Please try again.";
                    response = dialogflowResponse.getSuggestionsResponse(text, suggestions);
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