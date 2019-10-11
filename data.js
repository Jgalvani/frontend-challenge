const express = require("express");

fs = require('fs');

app = express();

exports.display = function (req, res) {
    name = req.params.name;
;   fs.readFile('./api/' + name, 'utf8', function (err, data) {
        if (err) {
            res.send('Nothing found');
        } else {
            res.send(data);
        }
    });
};
