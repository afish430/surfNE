var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var colors = require('colors');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// setup handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main_layout'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set up sessions
var credentials = require('./credentials');
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	resave: false,
	saveUninitialized: false,
	secret: credentials.cookieSecret
}));

//set the user, if logged in
app.use(function(req , res , next){
	if(req.session.user){
		res.locals.user = req.session.user;
		res.locals.isAdmin = req.session.user.isAdmin;
	}
	else {
		res.locals.user = null;
		res.locals.isAdmin = false;
	}
	next();
});

//pass io for use in routes
app.use(function(req, res, next) {
    req.io = io;
    next();
});

// Routing
var routes = require('./routes/index');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

//listen for connections
server.listen(3000, function(){
  console.log('Listening on http://localhost:3000'.green);
});

