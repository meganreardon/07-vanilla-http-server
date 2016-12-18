'use strict';

module.exports = function(req, callback) {
  // console.log('entered parse body function');
  req.body = '';

  req.on('data', function(data) {
    req.body += data.toString();
    // console.log('in parse body, req body is:', req.body);
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });
};
