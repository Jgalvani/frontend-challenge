const fs = require('fs');

exports.list = function (req, res) {
fs.readdir('./api',
    (err, files) => {
        res.send(files);
    });
}