const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

let app = express();

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

app.get('/todos', (req, res) => {
    todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
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

app.listen(3000, () => {
    console.log('app listing at port 3000');
});

module.exports = {app};