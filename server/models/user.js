const mongoose = require('mongoose');

let user = mongoose.model('user', {
    name: {
        type: String,
        required: [true, 'please add to do list.'],
        trim: true,
        minlength: 1

    },
    email : {
        type: String,
        require: true

    }
});

module.exports = {user};
