const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('failer to connect DB');
    }

    db.collection('Users').insertOne({name: 'Bufa', age: 45}, (err, result) => {
        if(err) {
            return console.log('failed to insert data', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.close();
});