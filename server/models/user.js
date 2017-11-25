//import { basename } from 'path';

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = mongoose.Schema({
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
})

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
  
    return _.pick(userObject, ['_id', 'email']);
  };  

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  
    user.tokens.push({access, token});
  
    return user.save().then(() => {
      return token;
    });
  };

  UserSchema.pre('save', function (next) {
    user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => { 
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
  });

let user = mongoose.model('user', UserSchema);

module.exports = {user};
