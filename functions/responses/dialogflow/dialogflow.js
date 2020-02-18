
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

exports.getTableResponse = (text, tableCard) => {
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
                          "tableCard": tableCard
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
                    ],
                    "suggestions": [
                        {
                            "title": "Back"
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
        },
        "outputContexts": [
            {
                "name": "projects/kn-vucetinec/agent/sessions/ABwppHGfFkWJdHKPpBEYiGkhdoakWmYj_2sZa4o8pbGG9nj4q5_GfDTtNEXOY34mLX8G4o_d7oZdUW9bnBZC/contexts/_selection_type",
                "lifespanCount": 99,
                "parameters": {
                    "data": "{\"selectionType\":teams}"
                }
            }
        ]
    }
};

exports.getCarouselResponse = (text, listSelectItems) => {
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
                    ],
                    "suggestions": [
                        {
                            "title": "Back"
                        }
                    ]
                },
                "systemIntent": {
                    "intent": "actions.intent.OPTION",
                    "data": {
                        "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                        "carouselSelect": {
                            "items": listSelectItems
                        }
                    }
                }
            }
        },
        "outputContexts": [
            {
                "name": "projects/kn-vucetinec/agent/sessions/ABwppHGfFkWJdHKPpBEYiGkhdoakWmYj_2sZa4o8pbGG9nj4q5_GfDTtNEXOY34mLX8G4o_d7oZdUW9bnBZC/contexts/_selection_type",
                "lifespanCount": 99,
                "parameters": {
                    "data": "{\"selectionType\":leagues}"
                }
            }
        ]
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

exports.log = (req, result) => {
    console.info("request");
    console.info(JSON.stringify(req.body));

    console.info("response");
    console.info(JSON.stringify(result));
};