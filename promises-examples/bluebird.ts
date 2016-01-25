/// <reference path="typings/bluebird/bluebird.d.ts" />

/**
 * promises-examples/bluebird.js: Initialize several async functions that use
 * bluebird's Promise module.
 */

import Promise = require('bluebird');

  
// self-defined promisify, from Node.js Design Patterm book.
// promisify function could work, due to the callback convention in most 
// Node.js modules.
export function promisify<T, A> (func: (arg: T, cb: (err: any, result: A) => void) => void)
  : (arg: T) => Promise<A> {
  // promisified is a class with promisified methods.
  // func is a conventional Node.js API function. The last 
  // argument is a callback function.
  return function promisified(arg: T): Promise<A> {
    // The return object is a Promise<A> instance.
    // This instance will use resolve and reject to implement the callback functionality
    // in func. 
    // func will still be applied, and the callback will still be called. But the 
    // callback function will be composited from resolve and reject.
    return new Promise<A>(
      function (resolve: (arg: A) => void, reject: (err: any) => void) {
        func.apply(null, [arg, function (err: any, res: A) {
          if (err) 
            reject(err);
          else 
            resolve(res);
        }]);
    });
  }
}

