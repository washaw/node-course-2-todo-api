const mongoose = require('mongoose');
const validator = require('validator');

let user = mongoose.model('user', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1

    },
    email : {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} isnot valid email'
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }
    ]
});

module.exports = {user};
