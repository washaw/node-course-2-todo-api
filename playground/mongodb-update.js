const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('failer to connect DB');
    }

    db.collection('todos').findOneAndUpdate({_id: new ObjectID('59b453ee1b9da139eabdde14')}, 
                                            { $set: {completed: true}}, 
                                            {returnOriginal: false}).then((result) => {
                                                console.log(result);
                                            });

    db.close();
});