const extract = require('extract-zip')
const path = require('path');
const fs = require('fs');

async function generate (api_name, auth, cors) {
    var source = path.join(__dirname, '..', 'assets', 'assets.zip');
    var target = path.join(__dirname, '..', api_name);
    try {
        await extract(source, { dir: target });
        if(!auth) {
            fs.unlinkSync(path.join(__dirname, '..', api_name, 'authentication.js'));
            fs.unlinkSync(path.join(__dirname, '..', api_name, 'models', 'users.js'));
            fs.unlinkSync(path.join(__dirname, '..', api_name, 'routes', 'userRoute.js'));
        }
        if(!cors) {
            fs.unlinkSync(path.join(__dirname, '..', api_name, 'routes', 'cors.js'));
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports.generate = generate;