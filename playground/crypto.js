const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
/*
let data = {
    id: 1,
    data: 'respect with love'
}

let coded = jwt.sign(data, 'babu')

console.log(`data - ${coded}`);

let decoded = jwt.verify(coded, 'babu');

console.log(`decoded - ${decoded}`); */

let password = 'Password123!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => { 
        console.log(hash);
    });
});