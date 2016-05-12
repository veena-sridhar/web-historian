var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var url = require('url');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};



// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths['list'], function (error, data) {
    if (error) {
      throw error;
    }
    callback(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(urlName, callback) {
  fs.readFile(exports.paths['list'], function (error, data) {
    if (error) {
      throw error;
    }
    var arraySites = data.toString().split('\n');
    return callback(arraySites.indexOf(urlName) > -1);
  });
};

exports.addUrlToList = function(urlName, callback) {
  filename = __dirname.replace(/\/helpers$/, '') + '/archives/sites.txt'; 
  fs.appendFile(filename, callback(urlName), function (error) {
    if (error) {
      throw error;
    }
  });
};

exports.isUrlArchived = function(urlName, callback) {
  fs.exists(exports.paths['archivedSites'], function (exists) {
    return callback(exists);
  }); 
};

exports.downloadUrls = function(array) {
 

  _.each(array, function (url) {
    exports.isUrlArchived(url, function (exists) {
      console.log(exists);
      if (exists) {
        filename = __dirname.replace(/\/helpers$/, '') + '/archives/sites/' + url;
        console.log('this is the filename', filename);
        request('http://' + url).pipe(fs.createWriteStream(filename));
        console.log('this is the url', url);
      }
    });
  });
};
