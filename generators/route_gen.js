const cp = require('../utils/grammar').capAndPlural;
const writeRoute = require('../utils/fileutil').writeRoute;
function generate(m, a){
    var name = m['name'];
    var route = `const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ${cp(name)} = require('../models/${name}s');

const ${name}Router = express.Router();
${name}Router.use(bodyParser.json());

${name}Router.route('/')
.get((req,res,next) => {
    ${cp(name)}.find({})
    .then((${name}s) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(${name}s);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    ${cp(name)}.create(req.body)
    .then((${name}) => {
        console.log('${name} Created ', ${name});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(${name});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    ${cp(name)}.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});
    
${name}Router.route('/:${name}Id')
.get((req,res,next) => {
    ${cp(name)}.findById(req.params.${name}Id)
    .then((${name}) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(${name});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
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
.delete((req, res, next) => {
    ${cp(name)}.findByIdAndRemove(req.params.${name}Id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = ${name}Router;`;
    
    writeRoute(name, route);
}

module.exports.generate = generate;