
var inconsistentRead = require('./example_inconsistentRead');

function createFileReader (filename) {
  var listeners = [];
  inconsistentRead(filename, function (data) {
    listeners.forEach(function (listener) {
      listener(data);
    });
  });

  return {
    onDataReady: function (listener) {
      // each listener is a callback function
      listeners.push(listener);
    }
  };
}

var filename = process.argv[2] || 'lorem.txt';

// In this case, we register the reader before the reader complete
var reader1 = createFileReader(filename);
reader1.onDataReady(function (data) {
  // At this time, the first reader has
  console.log('First call: ' + data);
  // In this case, the reader will run synchronously.
  var reader2 = createFileReader(filename);
  reader2.onDataReady(function (data) {
    console.log('Second call: ' + data);
  });
});
