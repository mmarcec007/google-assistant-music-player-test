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

exports.getAllFixtures = async () => {
    return firebaseStorageJsonApi.get('/responses%2Ffixtures_of_england.json?alt=media&token=67e2d29d-dc0f-4954-b5d4-de296c9dc9e7').then(response => {
        console.log(response.data);
        return response.data;
    }).catch(error => {
        console.log(error);
        return null;
    })
};

exports.getFinishedFixtures = async () => {
    return firebaseStorageJsonApi.get('/responses%2Ffixtures_of_england.json?alt=media&token=67e2d29d-dc0f-4954-b5d4-de296c9dc9e7').then(response => {
        console.log(response.data);
        const queryString = 'api[**][*status=Match Finished]';
        return jsonExtractor.getValuesFromJson(queryString, response.data);
    }).catch(error => {
        console.log(error);
        return null;
    })
};

exports.getCountries = async () => {
    return firebaseStorageJsonApi.get('/responses%2Fcountries_response.json?alt=media&token=c1d06639-5664-4a53-ace6-344e30eb8275').then(response => {
        console.log(response.data);
        return response.data;
    }).catch(error => {
        console.log(error);
        return null;
    })
};

exports.getLeagues = async () => {
    return firebaseStorageJsonApi.get('/responses%2Fleagues_of_england.json?alt=media&token=5e177a8d-01b4-49cc-81ae-c3d683d87a6a').then(response => {
        console.log(response.data);
        return response.data;
    }).catch(error => {
        console.log(error);
        return null;
    })
};

exports.getLeague = async (id) => {
    return firebaseStorageJsonApi.get('/responses%2Fleagues_of_england.json?alt=media&token=5e177a8d-01b4-49cc-81ae-c3d683d87a6a').then(response => {
        console.log(response.data);
        const queryString = 'api[**][*league_id='+id+']';
        return jsonExtractor.getSingleValueFromJson(queryString, response.data);
    }).catch(error => {
        console.log(error);
        return null;
    })
};
