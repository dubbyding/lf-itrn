const express = require('express');

const renderStatic = require('./middlewares/main');

const app = express();
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/static'));

const hostname = '127.0.0.1';

// app.use(express.static(__dirname, '/static'));

app.use('/', renderStatic);

app.listen(process.env.port || 3000);

console.log('Running at port:300', hostname, (err, done) => {
	if (err) {
		console.log('error running site');
	} else {
		console.log('Server Running');
	}
});
