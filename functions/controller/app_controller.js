const ReplicateService = require('../service/replicate_service.js');
const FirebaseStorageService = require('../service/firebase_storage_service.js');


const firebaseStorageService = new FirebaseStorageService();
const replicateService = new ReplicateService();


class AppController {

    async sendImageRestorationRequest(req, res) {
        try {

            let base64Data = req.body.base64Data;

            const result = await firebaseStorageService.uploadPhoto(base64Data);
            if (result === false) return res.sendStatus(404);

            let response = await replicateService.sendImageRestorationRequest(base64Data);

            return res.status(200).send(response);

        } catch (error) {
            console.log(`!!! error -> AppController/sendImageRestorationRequest -> error: ${error} , query: ${JSON.stringify(req.body)}`);
            return res.sendStatus(404);
        }
    }

    async checkImageRestoration(req, res) {
        try {

            let id = req.query.id;
            let response = await replicateService.checkImageRestoration(id);

            return res.status(200).send(response);

        } catch (error) {
            console.log(`!!! error -> AppController/checkImageRestoration -> error: ${error} , query: ${JSON.stringify(req.query)}`);
            return res.sendStatus(404);
        }
    }


}

module.exports = AppController;