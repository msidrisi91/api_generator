var fs = require('fs');
var path = require('path');
function edit(models, api_name, doc){
    var imports = '';
    var appuse = '';
    models.forEach(e => {
        imports = imports + `const ${e}Router = require('./routes/${e}Route');\n`;
        appuse = appuse + `app.use('/${e}s', ${e}Router);\n`
    });
    tab_names = '';
    tab_pages = '';
    doc.forEach((d) => {
        tab_names += d['name'] + '\n';
        tab_pages += d['page'] + '\n';
    })
    fs.readFile(path.join(__dirname, '..', api_name, 'app.js'), 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace('// {import_routes_here}', imports);
        result = result.replace('// {app.use_here}', appuse);

        fs.writeFile(path.join(__dirname, '..', api_name, 'app.js'), result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
    fs.readFile(path.join(__dirname, '..', api_name, 'package.json'), 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace('package_name_to_be_replaced', api_name);

        fs.writeFile(path.join(__dirname, '..', api_name, 'package.json'), result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
    fs.readFile(path.join(__dirname, '..', api_name, 'documentation', 'index.html'), 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace('__to_be_replaced_by_tab_name__', tab_names);
        result = result.replace('__to_be_replaced_by_tab_page__', tab_pages)
        
        fs.writeFile(path.join(__dirname, '..', api_name, 'documentation', 'index.html'), result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

module.exports.edit = edit;