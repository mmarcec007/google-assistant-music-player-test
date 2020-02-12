exports.getSimpleTestResponse = (parameters, detectedIntent, shouldEndSession) => {
    return {
        "version": "1.0",
        "sessionAttributes": {
            "key": parameters !== null ? parameters : "N/A"
        },
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": detectedIntent
            },
            "card": {
                "type": "Simple",
                "title": detectedIntent,
                "content": "This is the card content. This card just has plain text content.\r\nThe content is formated with line breaks to improve readability."
            },
            "shouldEndSession": shouldEndSession
        }
    }
};

exports.getSimpleResponse = (text, shouldEndSession) => {
    return {
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": text
            },
            "shouldEndSession": shouldEndSession
        }
    }
};
