const replicateConstants = require('../constant/replicate_constants.js');
const config = require('../config/config.js');
const env = require('../env.js');

const axios = require('axios').default;

class ReplicateService {

    async sendImageRestorationRequest(base64Data) {
        try {

            let headers = {
                "Content-Type": "application/json",
                "Authorization": `Token ${env.tokenKey}`,
            };

            let data = {
                "version": config.apiVersion,
                "input": {
                    "img": base64Data,
                },
            };

            let response = await axios.post(replicateConstants.baseUrl, data, { headers: headers });

            return response.data;

        } catch (error) {
            console.log(`!!! error -> ReplicateService/sendImageRestorationRequest -> error: ${error}`);
            return null
        }
    };

    async checkImageRestoration(id) {
        try {

            let url = `${replicateConstants.baseUrl}/${id}`;

            let headers = {
                "Content-Type": "application/json",
                "Authorization": `Token ${env.tokenKey}`,
            };

            let response = await axios.get(url, { headers: headers });

            return response.data;

        } catch (error) {
            console.log(`!!! error -> ReplicateService/checkImageRestoration -> error: ${error}`);
            return null
        }
    };

}

module.exports = ReplicateService;