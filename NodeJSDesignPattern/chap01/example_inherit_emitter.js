
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var util = require('util');

function FindPattern (regex) {
  // Initialize necessary properties
  EventEmitter.call(this);
  this.regex = regex;
  this.files = [];
}
util.inherits(FindPattern, EventEmitter);

// All these FindPattern methods will return the object itself.
// Then we could use a chain-like syntax.
FindPattern.prototype.addFile = function (file) {
  this.files.push(file);
  return this;
}

FindPattern.prototype.find = function () {
  var self = this;
  self.files.forEach(function (file) {
    fs.readFile(file, 'utf8', function (err, content) {
      if (err)
        return self.emit('error', err);

      self.emit('fileread', file);
      var match = null;
      if(match = content.match(self.regex)) {
        match.forEach(function(elem) {
          self.emit('found', file, elem);
        });
      }
    });
  });
  return this;
}

var findPattern = new FindPattern(/lorem \w+/g);
findPattern
  .addFile('file.txt')
  .addFile('lorem.txt')
  .find()
  .on('found', function (file, match) {
    console.log('Matched "' + match + '" in file ' + file);
  })
  .on('error', function (err) {
    console.log('Error: ' + err.message);
  });
