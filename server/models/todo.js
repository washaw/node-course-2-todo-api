const mongoose = require('mongoose');

let todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: [true, 'please add to do list.'],
        trim: true,
        minlength: 1

    },
    completed: {
        type: Boolean,
        defaul: false

    },
    completedAt: {
        type: Number,
        defaul: null
    }
});

module.exports = {todo};
