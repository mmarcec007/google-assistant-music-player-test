exports.getSimpleResponse = (parameters, detectedIntent, shouldEndSession) => {
    return {
        version: "1.0",
        sessionAttributes: {
            "key": parameters !== null ? parameters : "N/A"
        },
        response: {
            outputSpeech: {
                type: "PlainText",
                text: "Detected Intent is " + detectedIntent !== null ? detectedIntent : "not available!"
            },
            "shouldEndSession": shouldEndSession
        }
    }
};