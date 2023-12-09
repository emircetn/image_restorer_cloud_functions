
const firebase = require('./firebase_setup.js');


const firebaseFunctions = require('firebase-functions');
const express = require('express');
const app = express();

const AppController = require('./controller/app_controller.js');
const appController = new AppController();


firebase.initializeFirebase();

app.use(express.json());


app.use((req, res, next) => { next(); }); //add middleware


app.post('/image_restoration', async (req, res) => {
    return appController.sendImageRestorationRequest(req, res);
});


app.get('/image_restoration', async (req, res) => {
    return appController.checkImageRestoration(req, res);
});


exports.app = firebaseFunctions.runWith({
    timeoutSeconds: 540,
}).https.onRequest(app);