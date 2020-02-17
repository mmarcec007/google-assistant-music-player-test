const jsonQuery = require('json-query');

exports.getValuesFromJson = (jsonQueryString, jsonData) => {
    return jsonQuery(jsonQueryString, {data: jsonData}).value;
};

exports.getSingleValueFromJson = (jsonQueryString, jsonData) => {
    return jsonQuery(jsonQueryString, {data: jsonData}).value[0];
};
