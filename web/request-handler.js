var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  fs.readFile(path.join(__dirname, './public/index.html'), function(error, content) {
    console.log('this shows the file', content);
    if (error) {
      throw error;
    } 
    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.write(content);
    res.end();
  });
  // res.end(archive.paths.list);
};


