const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const admin = require('firebase-admin');

var serviceAccount = require('../student.json');

const app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const auth = getAuth(app);

module.exports = { app, auth };
