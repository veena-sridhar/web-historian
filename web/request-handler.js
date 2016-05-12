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
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
      data = data.toString().slice(4) + '\n';

    });
    req.on('end', function () {
      archive.addUrlToList(data, function (error, result) {
        // data = data.toString().slice(4) + '\n';
        if (error) {
          var statusCode = 404;
          var headers = defaultCorsHeaders;
          headers['Content-Type'] = 'text/plain';
          res.writeHead(statusCode, headers);
          res.end();
          return;   
        } else {
          var statusCode = 302;
          var headers = defaultCorsHeaders;
          headers['Content-Type'] = 'text/plain';
          res.writeHead(statusCode, headers);
          res.end(data);
          return; 
        }
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

