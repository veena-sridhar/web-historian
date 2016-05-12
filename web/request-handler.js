var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var path = url.parse(req.url, true);
  var filename = null;
  if (req.method === 'GET') {
    if (path.pathname === '/') {
      filename = __dirname + '/public/index.html';
    } else {
      filename = __dirname.replace(/\/web$/, '') + '/archives/sites' + path.pathname;
    }

    fs.readFile(filename, function(error, content) {
      if (error) {
        var statusCode = 404;
        var headers = defaultCorsHeaders;
        headers['Content-Type'] = 'text/plain';
        res.writeHead(statusCode, headers);
        res.end();
        return;  
      } 
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
    });
  } else if (req.method === 'POST') {
    filename = __dirname.replace(/\/web$/, '') + '/archives/sites.txt'; 
    fs.appendFile(filename, path.pathname, function (error, result) {
      filename = __dirname.replace(/\/web$/, '') + '/archives/sites' + path.pathname;
      fs.writeFile(filename, path.pathname, function (error) {
        if (error) {
          return error;
        }
        var statusCode = 302;
        var headers = defaultCorsHeaders;
        headers['Content-Type'] = 'text/plain';
        res.writeHead(statusCode, headers);
        res.end();
        return;
      });
    });
  }
};


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

