const express = require('express');
const bodyParser = require('body-parser');
require('./config/config');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

let app = express();
app.set('port', (process.env.PORT));

const {mongoose} = require('./db/mongoose');
const {todo} = require('./models/todo');
const {user} = require('./models/user');

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let newtodo = new todo({
        text: req.body.text
    });

    newtodo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).body(e);
    });
});

app.post('/users', (req, res) => {
    let newuser = new user(_.pick(req.body, ['name', 'email', 'password']));

    newuser.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/todos', (req, res) => {
    todo.find().then((todos) => {
        res.send({todos});
    }).catch((e) => {
        res.status(400).body(e);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    
    todo.findOne({_id : req.params.id}).then((todo) => {
            if (!todo) {
                res.status(404).send();
            } 
            
            res.send({todo});

        }).catch((err) => {
            res.status(400).send();
        });
    }    
);

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    todo.findByIdAndRemove({_id : req.params.id}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    }).catch ((err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let body = _.pick(req.body, ['text', 'completed']);

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send();
    }).catch ((e) => {
        res.status(400).send(e);
    })
});

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

module.exports = {app};