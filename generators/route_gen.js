const cp = require('../utils/grammar').capAndPlural;
const writeRoute = require('../utils/fileutil').writeRoute;
// TODO: add cors file generation in gen
function isauth(isallauth, prototype, authlist){
    if(isallauth) {
        type = prototype[0];
        isID = prototype[1];
        authlist.forEach(element => {
            if(element.substring(0, 2) === type && ((isID && element.includes(':')) || (!isID && !element.includes(':')))) {
                return 'authenticate.verifyUser, ';
            }
        });    
    }
    return '';
}
function generate(m, a){
    var iscors = '';
    var route = '';
    var isallauth = false;
    if(a['cors']) {
        iscors = 'cors.cors, ';
        route = route + "const cors = require('./cors');\n";
    }
    if(a['authentication']) {
        isallauth = true;
        route = route + "const authenticate = require('../authenticate');\n";
    }
    var name = m['name'];
    var postnID = `.post(${iscors}${isauth(isallauth, ['POST', false], m['fields']['auth'])}(req, res, next) => {
    ${cp(name)}.create(req.body)
    .then((${name}) => {
        console.log('${name} Created ', ${name});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(${name});
    }, (err) => next(err))
    .catch((err) => next(err));
})`;

    if (m['fields']['userPOST']) {
        postnID = `.post(${iscors}${isauth(isallauth, ['POST', false], m['fields']['auth'])}(req, res, next) => {
    ${cp(name)}.findById(req.body._id)
        .then((${name}) => {
            if (${name} == null) {
                let new${name} = {};
                new${name}.user = req.user._id;
                ${cp(name)}.create(new${name})
                    .then((${name}) => {
                        ${name}.${cp(name).toLowerCase()}.push(req.params.${name}Id)
                        ${name}.save()
                            .then((${name}) => {
                                ${cp(name)}.findById(${name}._id)
                                    .then((${name}) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(${name});
                                    })
                            }, (err) => next(err));
                    }, (err) => next(err))
                    .catch((err) => next(err));
            } else {
                err = new Error('${cp(name)} ' + req.params.${name}Id + ' already exist');
                err.status = 404;
                return next(err);
            }
        })
})`;
    }

    var getnID = `${name}Router.route('/')
.get(${iscors}${isauth(isallauth, ['GET', false], m['fields']['auth'])}(req,res,next) => {
    ${cp(name)}.find({})
    .then((${name}s) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(${name}s);
    }, (err) => next(err))
    .catch((err) => next(err));
})`;

    if(m['fields']['userGET']) {
        getnID = `${name}Router.route('/')
.get(${iscors}${isauth(isallauth, ['GET', false], m['fields']['auth'])}(req, res, next) => {
    ${cp(name)}.findById(req.params.${name}Id)
        .then((${name}) => {
            if (!(${name}.user.equals(req.user._id))) {
                var err = new Error('Only creator can perform this');
                err.status = 401;
                return next(err);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }, (err) => next(err))
        .catch((err) => next(err));
})`;
    }

    route = route + `const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ${cp(name)} = require('../models/${name}s');

const ${name}Router = express.Router();
${name}Router.use(bodyParser.json());

${getnID}
${postnID}
.delete(${iscors}${isauth(isallauth, ['DELETE', false], m['fields']['auth'])}(req, res, next) => {
    ${cp(name)}.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});
    
${name}Router.route('/:${name}Id')
.get(${iscors}${isauth(isallauth, ['GET', true], m['fields']['auth'])}(req,res,next) => {
    ${cp(name)}.findById(req.params.${name}Id)
    .then((${name}) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(${name});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(${iscors}${isauth(isallauth, ['PUT', true], m['fields']['auth'])}(req, res, next) => {
    ${cp(name)}.findByIdAndUpdate(req.params.${name}Id, {
        $set: req.body
    }, { new: true })
    .then((${name}) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(${name});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(${iscors}${isauth(isallauth, ['DELETE', true], m['fields']['auth'])}(req, res, next) => {
    ${cp(name)}.findByIdAndRemove(req.params.${name}Id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = ${name}Router;`;
    
    writeRoute(name, a['name'], route);
}

module.exports.generate = generate;