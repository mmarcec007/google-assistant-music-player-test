const jsonQuery = require('json-query');

exports.getValuesFromJson = (jsonQueryString, jsonData) => {
    return jsonQuery(jsonQueryString, {data: jsonData}).value;
};