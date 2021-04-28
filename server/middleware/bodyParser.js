const bodyParser = require('body-parser');

module.exports.jsonParser = bodyParser.json();

module.exports.urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports.textParser = bodyParser.text();