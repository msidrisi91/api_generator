const fs = require('fs');
const path = require('path');
module.exports.writeModel = function(name, api, string) {
    console.log(api);
    var dir = path.join(__dirname, '..', api, 'models')
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(path.join(dir, name + 's.js'), string, function (err) {
        if (err) throw err;
        // console.log(`${name}s.js model created!!`);
    }); 
}
module.exports.writeRoute = function(name, api, string) {
    var dir = path.join(__dirname, '..', api, 'routes');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(path.join(dir, name + 'Router.js'), string, function (err) {
        if (err) throw err;
        // console.log(`${name}Router.js router created!!`);
    }); 
}