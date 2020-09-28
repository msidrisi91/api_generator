const fs = require('fs');

var imports = `const mongoose = require('mongoose');
const Schema = mongoose.Schema;`;

function generate(a) {
    var schema = 'const ' + a['name'] + ' = new Schema({\n';
    var fields = a['fields'];
    var tab = '    ';
    var tab2 = tab + tab;
    var tab3 = tab2 + tab;
    // console.log(fields);
    // for(var i = 0; i < parseInt(a['n']); i++){
    //     console.log('\nheya\n');
    //     console.log(fields[i]);
    // }
    Object.keys(fields).forEach((f) => {
        // console.log(f +' => ' + fields[f])
        if(f.includes('name')){
            schema = schema + tab2 + fields[f] + ': {\n';
        }
        else if(f.includes('type')){
            schema = schema + tab3 + 'type: ' + fields[f] + ',\n';
        }
    });
}

module.exports.generate = generate;