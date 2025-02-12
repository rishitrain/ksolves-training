const fs = require('fs');

// const read = fs.createReadStream('example.txt');

// const writeStream = fs.createWriteStream('example.txt');

// writeStream.write('Hello, this is a stream example.\n');
// writeStream.write('Appending more data...\n');
// // writeStream.end();

// read.on('data', (chunk) => {
//     console.log('New Chunk:', chunk);
// });

// read.on('end', () => {
//     console.log('Finished reading the file.');
// });
 

const readStream = fs.createReadStream('example.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('File copied successfully!');
});
