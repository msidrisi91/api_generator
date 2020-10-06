const fs = require('fs');
module.exports.writeModel = function(name, string) {
    var dir = './models';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/' + name + 's.js', string, function (err) {
        if (err) throw err;
        // console.log(`${name}s.js model created!!`);
    }); 
}
module.exports.writeRoute = function(name, string) {
    var dir = './routes';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/' + name + 'Router.js', string, function (err) {
        if (err) throw err;
        // console.log(`${name}Router.js router created!!`);
    }); 
}