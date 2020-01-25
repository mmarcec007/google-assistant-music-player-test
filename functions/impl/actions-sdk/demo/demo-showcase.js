const actionsSdkResponse = require('../../../responses/actions-sdk/actions-sdk');
const mp3Files = [
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/01-freeky.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/02-hot.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/02-kitty-doesnt-like-320kbps.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/03-shit.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/03-talking-kitty-cat-stupid-stupid-world-320kbps.mp3",
    "https://mp3-utopian-plane.s3.eu-central-1.amazonaws.com/04-nowhere-az-few-far-between-320kbps.mp3",
    "https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3"
];

let currentItem = 0;
let wasBrowseCarouselCalled = false;

exports.demoImpl = (req, resp) => {
    console.log(currentItem);
    let result = actionsSdkResponse.getSimpleResponse("I didn't understand that. Can you please repeat?", true);

    if (req.body.conversation.type === 'NEW') {
        currentItem = 0;
        result = actionsSdkResponse.getSuggestionsResponse("You can choose between multiple suggestions on your device.");

        if (req.body.requestType && req.body.requestType === 'SIMULATOR') {
            result = actionsSdkResponse.getSuggestionsResponse("You can choose between multiple suggestions on your simulator.");
        }

        /*let userInputFromArguments = req.body.inputs[0].intent;
        if (userInputFromArguments) {
            userInputFromArguments = userInputFromArguments.toLowerCase();
            userInputFromArguments = userInputFromArguments.trim();

            if (userInputFromArguments === 'next') {
                // todo determine song to play with
                result = getMediaResponse("Here you go with the next available title: ", "https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3");
            } else if (userInputFromArguments === 'previous') {
                // todo determine song to play with
                result = getMediaResponse("Here you go with the previous available title: ", "https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3");
            } else {
                result = getSuggestionsResponse("You can choose between multiple suggestions on your device.");

                if (req.body.requestType && req.body.requestType === 'SIMULATOR') {
                    result = getSuggestionsResponse("You can choose between multiple suggestions on your simulator.");
                }
            }
        }*/
    } else if (req.body.conversation.type === 'ACTIVE') {
        if (req.body.inputs) {
            let userInput = req.body.inputs[0].rawInputs[0].query;
            let userIntentInput = req.body.inputs[0].arguments ?req.body.inputs[0].arguments[0] : null;
            console.log("user input:");
            console.log(userInput);
            if (userInput) {
                userInput = userInput.toLowerCase();

                if (userIntentInput && userIntentInput.name === 'OPTION') {
                    console.log("user input type:");
                    console.log(userIntentInput.name);
                    if (userIntentInput.textValue) {
                        result = actionsSdkResponse.getSuggestionsResponse(userIntentInput.textValue, true);
                    } else {
                        result = actionsSdkResponse.getSuggestionsResponse("I didn't understand that. Please choose something from the suggestions.", true);
                    }
                } else if (userIntentInput && userIntentInput.name === 'CONFIRMATION') {
                    let textualValue = "I didn't catch that.";
                    if (req.body.inputs[0].arguments[1] && req.body.inputs[0].arguments[1].name === 'text' ) {
                        textualValue = req.body.inputs[0].arguments[1].textValue;
                    }
                    if (userIntentInput.boolValue) {
                        result = actionsSdkResponse.getSuggestionsResponse("Your answer was: " + textualValue, true);
                    } else {
                        result = actionsSdkResponse.getSuggestionsResponse("Your answer was: " +textualValue, true);
                    }
                } else if (userIntentInput && userIntentInput.name === 'DATETIME') {
                    if (userIntentInput.datetimeValue) {
                        result = actionsSdkResponse.getSuggestionsResponse(JSON.stringify(userIntentInput.datetimeValue), true);
                    }
                } else if (wasBrowseCarouselCalled) {
                    wasBrowseCarouselCalled = false;
                    const browseCarouselInput = req.body.inputs[0].arguments[0].textValue;

                    if (browseCarouselInput) {
                        result = actionsSdkResponse.getSuggestionsResponse(browseCarouselInput, true);
                    }
                } else {
                    if (userInput === 'media') {
                        result = actionsSdkResponse.getMediaResponse("Here you go: ", mp3Files[currentItem]);
                    } else if (userInput === 'carousel') {
                        result = actionsSdkResponse.getCarouselResponse();
                    } else if (userInput === 'basic card') {
                        result = actionsSdkResponse.getBasicCard();
                    } else if (userInput === 'browse carousel') {
                        wasBrowseCarouselCalled = true;
                        result = actionsSdkResponse.getBrowseCarousel()
                    } else if (userInput === 'confirmation') {
                        result = actionsSdkResponse.getConfirmationResponse();
                    } else if (userInput === 'date time') {
                        result = actionsSdkResponse.getDateTime();
                    } else if (userInput === "delivery address") {
                        result = actionsSdkResponse.getDeliveryAddressResponse();
                    } else if (userInput === 'link out suggestion') {
                        result = actionsSdkResponse.getLinkOutSuggestionResponse();
                    } else if (userInput === 'list') {
                        result = actionsSdkResponse.getListResponse();
                    } else if (userInput === 'place') {
                        result = actionsSdkResponse.getPlaceResponse();
                    } else if (userInput === 'sign in') {
                        result = actionsSdkResponse.getSignInResponse();
                    } else if (userInput === 'table') {
                        result = actionsSdkResponse.getTableResponse("Table text");
                    } else if (userInput === 'transaction requirements') {
                        result = actionsSdkResponse.getTransactionRequirementsResponse()
                    } else if (userInput === 'order update') {
                        result = actionsSdkResponse.getOrderUpdateResponse()
                    } else if (userInput === 'cat') {
                        result = actionsSdkResponse.getSimpleResponse("Meow!", true);
                    } else {
                        result = actionsSdkResponse.getSuggestionsResponse("I didn't understand that. Please choose something from the suggestions.", true);
                    }
                }
            }

            // check media playing
            const mediaStatus = req.body.inputs[0].arguments[0];
            if (mediaStatus.name === 'MEDIA_STATUS' && mediaStatus.extension.status === 'FINISHED') {
                console.log("media status " +  mediaStatus.name);
                currentItem++;

                if (currentItem === mp3Files.length) {
                    currentItem = 0;
                }
                result = actionsSdkResponse.getMediaResponse("Playing next title with media status finished:", mp3Files[currentItem]);
            }
        } else {
            result = actionsSdkResponse.getSimpleResponse("You have to enter something!", true);
        }
    }

    actionsSdkResponse.log(req, result);
    resp.send(result);
};