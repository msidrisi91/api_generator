const fs = require('fs');

var imports = `const mongoose = require('mongoose');
const Schema = mongoose.Schema;`;

function generate(a) {
    var schema = 'const ' + a['name'] + ' = new Schema({\n';
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
            schema = schema + tab3 + 'default: '+fields[f]+'\n' + tab2 + '},\n';
        }
    });
}

module.exports.generate = generate;