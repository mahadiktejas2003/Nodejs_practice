//File helper module

const fs= require('fs')
//read path
// Read file
const readTheFile = (path) => {
    fs.readFile(path, 'utf-8', (err, result) => {
        if (err) {
            console.log('Error reading the file:', err);
        } else {
            console.log('File contents:', result);
        }
    });
};

const writeTheFile = (path, contentStr) => {
    fs.writeFile(path, contentStr, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
        } else {
            console.log('File has been written successfully!');
        }
    });
};

// Exporting
module.exports.writeFileOp = writeTheFile;
module.exports.readFileOp = readTheFile;