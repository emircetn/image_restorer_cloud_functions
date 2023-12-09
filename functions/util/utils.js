const uuid = require('uuid');


module.exports.generateRandomId = () => {
    const randomId = uuid.v4();
    return randomId;
}