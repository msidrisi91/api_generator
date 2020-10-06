const cp = require('../utils/grammar').capAndPlural;
const writeModel = require('../utils/fileutil').writeModel;
var header = `const mongoose = require('mongoose');
const Schema = mongoose.Schema;\n\n`;

function generate(m, a) {
    var schema = 'const ' + m['name'] + 'Schema = new Schema({\n';
    var fields = m['fields'];
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
    if(m['timestamp']){
        schema = schema + tab + '}, {\n' + tab2 + 'timestamp: true\n';
    }
    schema = schema + tab + '}\n);\n\n'
    schema = schema + 'var ' + cp(m['name']) + " = mongoose.model('" ;
    schema = schema + m['name'] + "', " + m['name'] + 'Schema);\n';
    schema = schema + 'module.exports = ' + cp(m['name']) + ';'
    writeModel(m['name'], header + schema);
}

module.exports.generate = generate;