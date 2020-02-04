const googleAuth = require('google-oauth-jwt');
const serviceAccount = require('../service-account');

exports.getToken = async () => {
    return new Promise((resolve => {
        googleAuth.authenticate(
            {
                email: serviceAccount.client_email,
                key: serviceAccount.private_key,
                scopes: ["https://www.googleapis.com/auth/dialogflow"]
            },
            (err, token) => {
                if (err) {
                    resolve(err)
                } else {
                    resolve(token)
                }
            }
        )
    }));
};