
exports.getSimpleResponse = (simpleResponseText, expectUserInput) => {
    return {
        "payload": {
            "google": {
                "expectUserResponse": expectUserInput,
                "richResponse": {
                    "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": simpleResponseText,
                                "displayText": simpleResponseText
                            }
                        }
                    ]
                }
            }
        }
    };
};
