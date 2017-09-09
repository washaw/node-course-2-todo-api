const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('failer to connect DB');
    }

    db.collection('todos').findOneAndDelete({todo: 'eat lunch'}).then((result) => {
        console.log(result);
    });

    db.close();
});