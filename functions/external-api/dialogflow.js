axios = require('axios');

const dialogFlowApi = axios.create({
    baseURL: "https://dialogflow.googleapis.com/v2",
    timeout: 10000
});

exports.detectIntent = async (userInput, languageCode, project, sessionID, token) => {
    const data = {
        "queryInput": {
            "text": {
                "text": userInput,
                "languageCode": languageCode
            }
        }
    };
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    return dialogFlowApi.post("/projects/"+project+"/agent/sessions/"+sessionID+":"+"detectIntent", data, config).then(response => {
        return response.data
    }).catch(error => {
        console.log(error);
        return null;
    })
};