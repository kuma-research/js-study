function addAsync(a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
}

console.log('before');
addAsync(1, 2, function (result) {
  console.log('result: ' + result);
})
console.log('after');