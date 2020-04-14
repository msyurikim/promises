/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

var fs = require('fs');
var pluck = require('../bare_minimum/promiseConstructor').pluckFirstLineFromFileAsync;
var Promise = require('bluebird');

var writeFileAsync = Promise.promisify(fs.writeFile);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
 // TODO
  //Promise.all waits for all to resolve
  return Promise.all(filePaths.map((path) => {
    //returns an array of Promises
    return pluck(path);
  }))
  .then((firstLines) => {
    var joined = firstLines.join(`\n`);

    return writeFileAsync(writePath, joined);
  })
  .catch((err) => {
    if (err) throw err;
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};