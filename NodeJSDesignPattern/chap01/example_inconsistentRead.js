var fs = require('fs');
var cache = {};

function inconsistentRead(filename, callback) {
  if (cache[filename]) {
    // will be synchronously
    callback(cache[filename]);
  } else {
    // asynchronous function
    fs.readFile(filename, 'utf8', function (err, data) {
      cache[filename] = data;
      callback(data);
    })
  }
}

module.exports = inconsistentRead;

// inconsistentRead(process.argv[2], function (data) {
//   console.log('File data: ' + process.argv[2]);
//   console.log(data);
// });
