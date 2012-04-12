(function() {
  var browserid_verify, https, parse_json;

  https = require('https');

  parse_json = function(callback) {
    return function(res) {
      var body;
      body = "";
      res.on('data', function(chunk) {
        return body += chunk;
      });
      return res.on('end', function() {
        return callback(JSON.parse(body));
      });
    };
  };

  browserid_verify = function(options, callback) {
    var conn, data, request;
    data = JSON.stringify(options);
    request = {
      host: 'browserid.org',
      path: '/verify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    conn = https.request(request, parse_json(callback));
    conn.write(data);
    return conn.end();
  };

  module.exports = browserid_verify;

}).call(this);
