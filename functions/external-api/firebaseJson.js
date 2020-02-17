axios = require('axios');
const jsonExtractor = require('../impl/core/helper/json-extractor');

const firebaseStorageJsonApi = axios.create({
    baseURL: "https://firebasestorage.googleapis.com/v0/b/kn-vucetinec-1565962572259.appspot.com/o",
    timeout: 100000
});

exports.getTeams = async () => {
    return firebaseStorageJsonApi.get('/responses%2Fteams_england_response.json?alt=media&token=54673d8c-b674-4e3b-a2b1-e10eaa4fa75b').then(response => {
        console.log(response.data);
        return response.data;
    }).catch(error => {
        console.log(error);
        return null;
    })
};

exports.getTeam = async (id) => {
    return firebaseStorageJsonApi.get('/responses%2Fteams_england_response.json?alt=media&token=54673d8c-b674-4e3b-a2b1-e10eaa4fa75b').then(response => {
        console.log(response.data);
        const queryString = 'api[**][*team_id='+id+']';
        return jsonExtractor.getSingleValueFromJson(queryString, response.data);
    }).catch(error => {
        console.log(error);
        return null;
    })
};
