const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('failer to connect DB');
    }

    db.collection('todos').find({_id : new ObjectID('59ade6c7e5eee7200ca0207e')}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch documents');
    });

    db.close();
});