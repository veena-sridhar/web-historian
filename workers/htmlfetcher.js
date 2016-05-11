// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');
var fs = require('fs');


fs.readfile('./index.html', function(html) {
  response.writeHeader(200, {'Content-Type': 'text/html'});
  response.write(html);
  response.end();
});