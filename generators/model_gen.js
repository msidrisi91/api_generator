const fs = require('fs');

var header = `const mongoose = require('mongoose');
const Schema = mongoose.Schema;\n\n`;

function firstCapAndPlural(string) {
    return string.charAt(0).toUpperCase() + string.slice(1) + 's';
}
function generate(a) {
    var schema = 'const ' + a['name'] + 'Schema = new Schema({\n';
    var fields = a['fields'];
    var tab = '    ';
    var tab2 = tab + tab;
    var tab3 = tab2 + tab;

    Object.keys(fields).forEach((f) => {
        if(f.includes('name')){
            schema = schema + tab2 + fields[f] + ': {\n';
        } else if(f.includes('type')){
            schema = schema + tab3 + 'type: ' + fields[f] + ',\n';
        } else if(f.includes('required') && fields[f]) {
            schema = schema + tab3 + 'required: true\n' + tab2 + '},\n';
        } else if(f.includes('default') && fields[f]){
            schema = schema + tab3 + "default: '"+fields[f]+"'\n" + tab2 + '},\n';
        }
    });
    if(a['timestamp']){
        schema = schema + tab + '}, {\n' + tab2 + 'timestamp: true\n';
    }
    schema = schema + tab + '}\n);\n\n'
    schema = schema + 'var ' + firstCapAndPlural(a['name']) + " = mongoose.model('" + a['name'] + "', " + a['name'] + 'Schema);\n';
    schema = schema + 'module.exports = ' + firstCapAndPlural(a['name']) + ';'
    var dir = './models';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/' + a['name'] + 's.js', header + schema, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

module.exports.generate = generate;