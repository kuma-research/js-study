var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BluebirdPromises = require('./bluebird');
var DelayPrintAsyncBased = (function () {
    function DelayPrintAsyncBased() {
    }
    DelayPrintAsyncBased.prototype.printAsync = function (str, callback) {
        setTimeout(function () {
            console.log(str);
            callback(null, str);
        }, 1000);
    };
    DelayPrintAsyncBased.prototype.print = function (str) {
        this.printAsync(str, function (err, str) {
            console.log('DelayPrintAsyncBased: callback return => ' + str);
            return null;
        });
    };
    return DelayPrintAsyncBased;
})();
var DelayPrintPromisified = (function (_super) {
    __extends(DelayPrintPromisified, _super);
    function DelayPrintPromisified() {
        _super.apply(this, arguments);
        this.printPromisified = BluebirdPromises.promisify(this.printAsync);
    }
    DelayPrintPromisified.prototype.print = function (str) {
        this.printPromisified(str).then(function (str) {
            console.log('DelayPrintPromisified: callback return => ' + str);
            return null;
        });
    };
    return DelayPrintPromisified;
})(DelayPrintAsyncBased);
var delayPrintAsyncBased = new DelayPrintAsyncBased();
var delayPrintPromisified = new DelayPrintPromisified();
delayPrintAsyncBased.print('Hello World!');
delayPrintPromisified.print('Hello World!');
