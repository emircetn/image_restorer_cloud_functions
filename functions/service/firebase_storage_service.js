const firebase = require('../firebase_setup.js');
const utils = require('../util/utils.js');

const mime = require('mime-types');
const path = require('path');


class FirebaseStorageService {

    async uploadPhoto(base64Data) {

        try {
            const dataUriRegex = /^data:([A-Za-z-+\/]+);base64,(.+)$/;
            const matches = base64Data.match(dataUriRegex);

            const contentType = matches[1];
            const base64Image = matches[2];
            const extension = mime.extension(contentType);

            const buffer = Buffer.from(base64Image, 'base64');
            const id = utils.generateRandomId();

            let imageFileRef = `images/${id}.${extension}`
            const file = firebase.firebaseAdmin.storage().bucket().file(imageFileRef);

            await new Promise((resolve, reject) => {
                file.save(buffer, {
                    metadata: { contentType: contentType },
                }, (error) => {
                    if (error) {
                        console.error('Error:', error);
                        reject('An error occurred while uploading the image.');
                    } else {
                        resolve();
                    }
                });
            });

            return true

        } catch (error) {
            console.log(`!!! error -> FirebaseStorageService/uploadPhoto : error:${error}`);
            return false;
        }

    }
}

module.exports = FirebaseStorageService;