const express = require('express');
const bodyparser = require('body-parser');

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const app = express();

const router = require('./routes/routes');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method == "OPTIONS") {
        res.header('Access-Control-Allow-Methods', "GET", "POST", "PUT", "DELETE", "OPTIONS");
		res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Requested-With");
		res.sendStatus(200);
	} else {
		next();
	}
});

app.use(router);

app.listen(port, hostname, function(){
	console.log("http://" + hostname + ":" + port);
});