
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

exports.getTableResponse = (text) => {
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
                                      "dividerAfter": false
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
                  ],
                  "suggestions": [
                      {
                          "title": "Back"
                      }
                  ]
              }
          }
      }
  }
};

exports.getSuggestionsResponse = (simpleResponseText, suggestions) => {
    return {
        "payload": {
            "google": {
                "expectUserResponse": true,
                "richResponse": {
                    "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": simpleResponseText
                            }
                        }
                    ],
                    "suggestions": suggestions
                }
            }
        }
    }
};

exports.getListResponse = (text, listTitle, listSelectItems) => {
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
                        }
                    ]
                },
                "systemIntent": {
                    "intent": "actions.intent.OPTION",
                    "data": {
                        "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                        "listSelect": {
                            "title": listTitle,
                            "items": listSelectItems
                        }
                    }
                }
            }
        }
    }
};

exports.getBasicCardResponse = (text, singleItem) => {
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
                            "basicCard": singleItem
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