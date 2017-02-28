var db = require('./db/db-manager.js');
var config = require('./config.js');
var _ = require('underscore');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var db = {
	projects: {},
	tasks: {}
};

app.listen(config.port, function () {
	console.log('Server started: http://localhost:' + config.port);
});

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static(config._pablic));


app.get('/projects', function(req, res, next) {
	res.send(_.toArray(db.projects));
	res.end();
	next();
});

app.post('/projects/', function(req, res, next) {
	req.body['_id'] = new Date().valueOf();
	db.projects[req.body._id] = req.body;
	db.tasks[req.body._id] = {};
	res.send(req.body);
	res.end();
	next();
});

app.put('/projects/:id', function(req, res, next) {
	db.projects[req.params.id] = req.body;
	res.send(req.body);
	res.end();
	next();
});

app.delete('/projects/:id', function(req, res, next) {
	delete db.projects[req.params.id];
	delete db.tasks[req.body._id];
	res.sendStatus(200);
	res.end();
	next();
});



app.get('/projects/:id/tasks', function(req, res, next) {
	var tasks = _.toArray(db.tasks[req.params.id]);
	var sorter = function (a, b) {
		return parseInt(a.priority, 10) - parseInt(b.priority, 10);
	};
	res.send( tasks.sort(sorter) );
	res.end();
	next();
});

app.post('/projects/:id/tasks/', function(req, res, next) {
	req.body['_id'] = new Date().valueOf();
	db.tasks[req.params.id][req.body._id] = req.body;
	res.send(req.body);
	res.end();
	next();
});

app.put('/projects/:id/tasks/:task', function(req, res, next) {
	db.tasks[req.params.id][req.params.task] = req.body;
	res.send(req.body);
	res.end();
	next();
});

app.delete('/projects/:id/tasks/:task', function(req, res, next) {
	delete db.tasks[req.params.id][req.params.task];
	res.sendStatus(200);
	res.end();
	next();
});