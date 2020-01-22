'use strict';

const functions = require('firebase-functions');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const getSimpleResponse = (simpleResponseText, expectUserInput) => {
    return {
        "expectUserResponse": expectUserInput,
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": simpleResponseText
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ],
       "conversationToken": "{\"data\":{\"firstNum\":23}}"
    };
};

const getMediaResponse = (text, mp3Url) => {
    const fileName = mp3Url.substring(mp3Url.lastIndexOf('/')+1);
    return {
        "expectUserResponse": true,
        "expectedInputs": [
            {
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ],
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": text
                                }
                            },
                            {
                                "name": "Test " + fileName,
                                "mediaResponse": {
                                    "mediaType": "AUDIO",
                                    "mediaObjects": [
                                        {
                                            "contentUrl": mp3Url
                                        }
                                    ]
                                }
                            }
                        ],
                        "suggestions": [
                            {
                                "title": "Stop playing Jazz Music"
                            },
                            {
                                "title": "next"
                            },
                            {
                                "title": "previous"
                            }
                        ]
                    }
                }
            }
        ],
       "conversationToken": "{\"data\":" +
           "{\"previousSong\":"+currentItem >= 0 ? mp3Files[currentItem] : mp3Files[0]+", " +
                "\"nextSong\":"+currentItem === mp3Files.length  ? mp3Files[0] : mp3Files[currentItem]+", " +
           "}" +
       "}"
    }
};

const getInitialResponse = (simpleResponseText) => {
    return {
        "expectUserResponse": true,
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": simpleResponseText
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ],
       "conversationToken": "{\"data\":{\"firstNum\":23}}"
    };
};

const getConfirmationResponse = () => {
    return {
        "expectUserResponse": true,
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "ssml": "PLACEHOLDER",
                                    "displayText": "PLACEHOLDER"
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.CONFIRMATION",
                        "inputValueData": {
                            "@type": "type.googleapis.com/google.actions.v2.ConfirmationValueSpec",
                            "dialogSpec": {
                                "requestConfirmationText": "Can you confirm?"
                            }
                        }
                    }
                ]
            }
        ],
       "conversationToken": "{\"data\":{\"firstNum\":23}}"
    }
};

const getBasicCard = () => {
    return {
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectUserResponse": true,
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Simple Responses must be included."
                                }
                            },
                            {
                                "basicCard": {
                                    "title": "Title: this is a title",
                                    "subtitle": "This is a subtitle",
                                    "formattedText": "This is a basic card.  Text in a basic card can include \"quotes\" and\nmost other unicode characters including emoji 📱.  Basic cards also support\nsome markdown formatting like *emphasis* or _italics_, **strong** or\n__bold__, and ***bold itallic*** or ___strong emphasis___ as well as other\nthings like line  \nbreaks",
                                    "image": {
                                        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdz51fONoWpR5ZOKpJaCUFQGikBHXy81F7fx7WRhcNanYXSQfR",
                                        "accessibilityText": "This is an image of an image"
                                    },
                                    "buttons": [
                                        {
                                            "title": "This is a button",
                                            "openUrlAction": {
                                                "url": "https://icatcare.org/advice/thinking-of-getting-a-cat/"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ]
    }
};

const getBrowseCarousel = () => {
    return {
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectUserResponse": true,
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Simple Responses must be included."
                                }
                            },
                            {
                                "carouselBrowse": {
                                    "items": [
                                        {
                                            "title": "Cat 1",
                                            "openUrlAction": {
                                                "url": "https://google.com"
                                            },
                                            "description": "Cat 1 Description",
                                            "footer": "Cat 1 footer",
                                            "image": {
                                                "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdz51fONoWpR5ZOKpJaCUFQGikBHXy81F7fx7WRhcNanYXSQfR&s",
                                                "accessibilityText": "Information about Google Assistant"
                                            }
                                        },
                                        {
                                            "title": "Cat 2 Title",
                                            "openUrlAction": {
                                                "url": "https://google.com"
                                            },
                                            "description": "Cat 2 Description",
                                            "footer": "Cat 2 footer",
                                            "image": {
                                                "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdz51fONoWpR5ZOKpJaCUFQGikBHXy81F7fx7WRhcNanYXSQfR&s",
                                                "accessibilityText": "Information about Google Assistant"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ]
    }
};

const getCarouselResponse = () => {
    return {
        "expectUserResponse": true,
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Here are some cat images."
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.OPTION",
                        "inputValueData": {
                            "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                            "carouselSelect": {
                                "items": [
                                    {
                                        "optionInfo": {
                                            "key": "SELECTION_KEY_CAT_1",
                                            "synonyms": [
                                                "synonym of title 1",
                                                "synonym of title 2",
                                                "synonym of title 3"
                                            ]
                                        },
                                        "description": "Item 1 Description",
                                        "image": {
                                            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdz51fONoWpR5ZOKpJaCUFQGikBHXy81F7fx7WRhcNanYXSQfR&s",
                                            "accessibilityText": "This is accessibility text"
                                        },
                                        "title": "Cat 1"
                                    },
                                    {
                                        "optionInfo": {
                                            "key": "SELECTION_KEY_CAT_2",
                                            "synonyms": [
                                                "Cici",
                                                "Maca",
                                                "Macor"
                                            ]
                                        },
                                        "description": "Google Home is a voice-activated speaker powered by the Google Assistant.",
                                        "image": {
                                            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQETeYfZRJfZzIRyA_S49mdig7L3JM9gETojvbTdP1Waf7LbEor&s",
                                            "accessibilityText": "This is accessibility text"
                                        },
                                        "title": "Cat 2"
                                    },
                                    {
                                        "optionInfo": {
                                            "key": "SELECTION_KEY_CAT_3",
                                            "synonyms": [
                                                "Cici 2",
                                                "Maca 2",
                                                "Macor 2"
                                            ]
                                        },
                                        "description": "Pixel. Phone by Google.",
                                        "image": {
                                            "url": "https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg",
                                            "accessibilityText": "This is accessibility text"
                                        },
                                        "title": "Cat 3"
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        ],
       "conversationToken": "{\"data\":{\"firstNum\":23}}"
    }
};

const traverse = function(o, fn) {
    for (let i in o) {
        fn.apply(this, [i, o[i]]);
        if (o[i] !== null && typeof(o[i]) === "object") {
            traverse(o[i], fn);
        }
    }
};

const log = (req, result) => {
    const conversation = req.body.conversation;
    console.info("conversation id " + conversation.conversationId + " and conversation type " + conversation.type);

    console.info("request");
    console.info(JSON.stringify(req.body));

    console.info("response");
    console.info(JSON.stringify(result));
};

const getDateTime = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "PLACEHOLDER"
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.DATETIME",
                        "inputValueData": {
                            "@type": "type.googleapis.com/google.actions.v2.DateTimeValueSpec",
                            "dialogSpec": {
                                "requestDatetimeText": "When would you like to schedule the appoinment for your cat?",
                                "requestDateText": "What day was that?",
                                "requestTimeText": "What time?"
                            }
                        }
                    }
                ]
            }
        ]
    };
};

const getDeliveryAddressResponse = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "PLACEHOLDER"
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.DELIVERY_ADDRESS",
                        "inputValueData": {
                            "@type": "type.googleapis.com/google.actions.v2.DeliveryAddressValueSpec",
                            "addressOptions": {
                                "reason": "handle this for you"
                            }
                        }
                    }
                ]
            }
        ]
    }
};

const getLinkOutSuggestionResponse = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Link Out Suggestion Simple Responses."
                                }
                            }
                        ],
                        "linkOutSuggestion": {
                            "destinationName": "Suggestion Link",
                            "url": "https://assistant.google.com/"
                        }
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ]
    }
};

const getListResponse = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Simple Responses must be included."
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.OPTION",
                        "inputValueData": {
                            "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                            "listSelect": {
                                "title": "Things to learn about",
                                "items": [
                                    {
                                        "optionInfo": {
                                            "key": "MATH_AND_PRIME",
                                            "synonyms": [
                                                "math",
                                                "math and prime",
                                                "prime numbers",
                                                "prime"
                                            ]
                                        },
                                        "description": "42 is an abundant number",
                                        "image": {
                                            "url": "https://images-na.ssl-images-amazon.com/images/I/81rwFAU3exL._SL1500_.jpg",
                                            "accessibilityText": "Information about numbers"
                                        },
                                        "title": "Title of the First List Item"
                                    },
                                    {
                                        "optionInfo": {
                                            "key": "EGYPT",
                                            "synonyms": [
                                                "religion",
                                                "egypt",
                                                "ancient egyptian"
                                            ]
                                        },
                                        "description": "42 gods ruled on the fate of the dead in the afterworld",
                                        "image": {
                                            "url": "https://andantetravels.co.uk/media/3857/egypt-cairo-giza-general-view-of-pyramids-with-sphinx.jpg",
                                            "accessibilityText": "Egypt"
                                        },
                                        "title": "Ancient Egyptian religion"
                                    },
                                    {
                                        "optionInfo": {
                                            "key": "RECIPES",
                                            "synonyms": [
                                                "recipes",
                                                "recipe",
                                                "42 recipes"
                                            ]
                                        },
                                        "description": "A beautifully simple recipe",
                                        "image": {
                                            "url": "data:image/jpeg;base64,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",
                                            "accessibilityText": "Recipe"
                                        },
                                        "title": "42 recipes in 42 ingredients"
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
};

const getPlaceResponse = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "PLACEHOLDER"
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.PLACE",
                        "inputValueData": {
                            "@type": "type.googleapis.com/google.actions.v2.PlaceValueSpec",
                            "dialogSpec": {
                                "extension": {
                                    "@type": "type.googleapis.com/google.actions.v2.PlaceValueSpec.PlaceDialogSpec",
                                    "permissionContext": "To find a place to pick you up",
                                    "requestPrompt": "Where would you like to be picked up?"
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
};

const getSignInResponse = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "PLACEHOLDER"
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.SIGN_IN",
                        "inputValueData": {
                            "@type": "type.googleapis.com/google.actions.v2.SignInValueSpec",
                            "optContext": ""
                        }
                    }
                ]
            }
        ]
    }
};

const getTableResponse = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Simple Responses must be included."
                                }
                            },
                            {
                                "tableCard": {
                                    "title": "Table Title",
                                    "subtitle": "Table Subtitle",
                                    "image": {
                                        "url": "https://avatars0.githubusercontent.com/u/23533486",
                                        "accessibilityText": "Actions on Google"
                                    },
                                    "rows": [
                                        {
                                            "cells": [
                                                {
                                                    "text": "row 1 item 1"
                                                },
                                                {
                                                    "text": "row 1 item 2"
                                                },
                                                {
                                                    "text": "row 1 item 3"
                                                }
                                            ],
                                            "dividerAfter": true
                                        },
                                        {
                                            "cells": [
                                                {
                                                    "text": "row 2 item 1"
                                                },
                                                {
                                                    "text": "row 2 item 2"
                                                },
                                                {
                                                    "text": "row 2 item 3"
                                                }
                                            ],
                                            "dividerAfter": true
                                        },
                                        {
                                            "cells": [
                                                {
                                                    "text": "row 3 item 1"
                                                },
                                                {
                                                    "text": "row 3 item 2"
                                                },
                                                {
                                                    "text": "row 3 item 3"
                                                }
                                            ]
                                        }
                                    ],
                                    "columnProperties": [
                                        {
                                            "header": "header 1",
                                            "horizontalAlignment": "CENTER"
                                        },
                                        {
                                            "header": "header 2",
                                            "horizontalAlignment": "LEADING"
                                        },
                                        {
                                            "header": "header 1",
                                            "horizontalAlignment": "TRAILING"
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "title": "Button Title",
                                            "openUrlAction": {
                                                "url": "https://github.com/actions-on-google"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ]
    }
};

const getTransactionRequirementsResponse = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "orderOptions": {
                                    "requestDeliveryAddress": false
                                },
                                "paymentOptions": {
                                    "googleProvidedOptions": {
                                        "prepaidCardDisallowed": false,
                                        "supportedCardNetworks": [
                                            "VISA",
                                            "AMEX",
                                            "DISCOVER",
                                            "MASTERCARD"
                                        ],
                                        "tokenizationParameters": {}
                                    }
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ]
    }
};

const getOrderUpdateResponse = () => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Order Update Sample Responses."
                                }
                            },
                            {
                                "structuredResponse": {
                                    "orderUpdate": {
                                        "actionOrderId": "abc-google-order-id",
                                        "orderState": {
                                            "label": "Order created",
                                            "state": "IN_TRANSIT"
                                        },
                                        "receipt": {
                                            "userVisibleOrderId": ""
                                        },
                                        "updateTime": "2018-11-01T19:22:17.237Z"
                                    }
                                }
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ]
    }
};

const getSuggestionsResponse = (simpleResponseText) => {
    return {
        "expectUserResponse": true,
       "conversationToken": "{\"data\":{\"firstNum\":23}}",
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": simpleResponseText
                                }
                            }
                        ],
                        "suggestions": [
                            {
                                "title": "Basic Card"
                            },
                            {
                                "title": "Browse Carousel"
                            },
                            {
                                "title": "Carousel"
                            },
                            {
                                "title": "List"
                            },
                            {
                                "title": "Media"
                            },
                            {
                                "title": "Link Out Suggestion"
                            },
                            {
                                "title": "Place"
                            },
                            {
                                "title": "Table"
                            }
                        ]
                    }
                },
                "possibleIntents": [
                    {
                        "intent": "actions.intent.TEXT"
                    }
                ]
            }
        ]
    }
};

// single item related response
// multi item related response
// helper intent related response


// it is a little bit ugly, but for the sake of testing it is good enough
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

exports.webhook = functions.https.onRequest((req, resp) => {
    //currentItem = currentItem = Math.floor(Math.random() * (mp3Files.length));

    console.log(currentItem);
    let result = getSimpleResponse("I didn't understand that. Can you please repeat?", true);

    if (req.body.conversation.type === 'NEW') {
        currentItem = 0;
        result = getSuggestionsResponse("You can choose between multiple suggestions on your device.");

        if (req.body.requestType && req.body.requestType === 'SIMULATOR') {
            result = getSuggestionsResponse("You can choose between multiple suggestions on your simulator.");
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
            let userIntentInput = req.body.inputs[0].arguments[0];
            console.log("user input:");
            console.log(userInput);
            if (userInput) {
                userInput = userInput.toLowerCase();

                if (userIntentInput && userIntentInput.name === 'OPTION') {
                    console.log("user input type:");
                    console.log(userIntentInput.name);
                    if (userIntentInput.textValue) {
                        result = getSuggestionsResponse(userIntentInput.textValue, true);
                    } else {
                        result = getSuggestionsResponse("I didn't understand that. Please choose something from the suggestions.", true);
                    }
                } else if (userIntentInput && userIntentInput.name === 'CONFIRMATION') {
                    let textualValue = "I didn't catch that.";g
                    if (req.body.inputs[0].arguments[1] && req.body.inputs[0].arguments[1].name === 'text' ) {
                        textualValue = req.body.inputs[0].arguments[1].textValue;
                    }
                    if (userIntentInput.boolValue) {
                        result = getSuggestionsResponse("Your answer was: " + textualValue, true);
                    } else {
                        result = getSuggestionsResponse("Your answer was: " +textualValue, true);
                    }
                } else if (userIntentInput && userIntentInput.name === 'DATETIME') {
                    if (userIntentInput.datetimeValue) {
                        result = getSuggestionsResponse(JSON.stringify(userIntentInput.datetimeValue), true);
                    }
                } else if (wasBrowseCarouselCalled) {
                    wasBrowseCarouselCalled = false;
                    const browseCarouselInput = req.body.inputs[0].arguments[0].textValue;

                    if (browseCarouselInput) {
                        result = getSuggestionsResponse(browseCarouselInput, true);
                    }
                } else {
                    if (userInput === 'media') {
                        result = getMediaResponse("Here you go: ", mp3Files[currentItem]);
                    } else if (userInput === 'carousel') {
                        result = getCarouselResponse();
                    } else if (userInput === 'basic card') {
                        result = getBasicCard();
                    } else if (userInput === 'browse carousel') {
                        wasBrowseCarouselCalled = true;
                        result = getBrowseCarousel()
                    } else if (userInput === 'confirmation') {
                        result = getConfirmationResponse();
                    } else if (userInput === 'date time') {
                        result = getDateTime();
                    } else if (userInput === "delivery address") {
                        result = getDeliveryAddressResponse();
                    } else if (userInput === 'link out suggestion') {
                        result = getLinkOutSuggestionResponse();
                    } else if (userInput === 'list') {
                        result = getListResponse();
                    } else if (userInput === 'place') {
                        result = getPlaceResponse();
                    } else if (userInput === 'sign in') {
                        result = getSignInResponse();
                    } else if (userInput === 'table') {
                        result = getTableResponse();
                    } else if (userInput === 'transaction requirements') {
                        result = getTransactionRequirementsResponse()
                    } else if (userInput === 'order update') {
                        result = getOrderUpdateResponse()
                    } else if (userInput === 'cat') {
                        result = getSimpleResponse("Meow!", true);
                    } else {
                        result = getSuggestionsResponse("I didn't understand that. Please choose something from the suggestions.", true);
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
                result = getMediaResponse("Playing next title with media status finished:", mp3Files[currentItem]);
            }
        } else {
            result = getSimpleResponse("You have to enter something!", true);
        }
    }

    log(req, result);
    resp.send(result);
});
