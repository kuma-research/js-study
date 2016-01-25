
import BluebirdPromises = require('./bluebird');

interface DelayPrint {
  print(str: string): void; 
}

class DelayPrintAsyncBased implements DelayPrint {
  
  printAsync(str: string, callback: (err: any, res: string) => void)
    : void {
    
    setTimeout(function () {
      console.log(str);
      callback(null, str);
    }, 1000);
  } 
  
  print(str: string): void {
    this.printAsync(str, function (err, str) {
      console.log('DelayPrintAsyncBased: callback return => ' + str);
      return null;
    });
  }
}

class DelayPrintPromisified extends DelayPrintAsyncBased {
  printPromisified: (str: string) => Promise<string> = 
    BluebirdPromises.promisify<string, string>(this.printAsync);
 
  print(str: string): void {
    this.printPromisified(str).then(function(str: string) {
      console.log('DelayPrintPromisified: callback return => ' + str);
      return null;
    })
  }
}

var delayPrintAsyncBased = new DelayPrintAsyncBased();
var delayPrintPromisified = new DelayPrintPromisified();

delayPrintAsyncBased.print('Hello World!');
delayPrintPromisified.print('Hello World!');