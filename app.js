// app.js

const { writeFileOp, readFileOp } = require('./file.js');

// Test write
writeFileOp('app.txt', 'This is a test message');

// Test read
readFileOp('app.txt');
