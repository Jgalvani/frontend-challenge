exports.list = function (req, res) {
;   fs.readFile('./api/categories.json', 'utf8', function (err, data) {
        if (err) {
            res.send('Nothing found');
        } else {
            res.send(data);
        }
    });
};
