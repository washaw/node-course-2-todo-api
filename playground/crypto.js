const jwt = require('jsonwebtoken');

let data = {
    id: 1,
    data: 'respect with love'
}

let coded = jwt.sign(data, 'babu')

console.log(`data - ${coded}`);

let decoded = jwt.verify(coded, 'babu');

console.log(`decoded - ${decoded}`);