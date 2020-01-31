
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

exports.getMediaResponse = (text, mp3Url) => {
    const fileName = mp3Url.substring(mp3Url.lastIndexOf('/')+1);
    return {
      "payload": {
          "google": {
              "expectUserResponse": true,
              "richResponse": {
                  "items": [
                      {
                          "simpleResponse": {
                              "textToSpeech": text
                          }
                      },
                      {
                          "mediaResponse": {
                              "mediaType": "AUDIO",
                              "mediaObjects": [
                                  {
                                      "contentUrl": mp3Url,
                                      "description": mp3Url,
                                      "name": fileName
                                  }
                              ]
                          }
                      }
                  ],
                  "suggestions": [
                      {
                          "title": "Media"
                      }
                  ]
              }
          }
      }
    }
};


exports.log = (req, result) => {
    console.info("request");
    console.info(JSON.stringify(req.body));

    console.info("response");
    console.info(JSON.stringify(result));
};