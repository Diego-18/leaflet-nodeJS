const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const http = require('http');
const socketIO = require('socket.io');

//initializations
const app = express();
const server = http.createServer(app);              //create server
const io = socketIO(server);                        //create socket

//importing routes
const indexRoutes = require('./routes/');

//settings
app.set('port', process.env.PORT || 4000);           //setting port
app.engine('ejs', engine);                          //setting engine
app.set('view engine', 'ejs');                      //setting view engine
app.set('views', path.join(__dirname, 'views'));    //setting views

//routes
app.use('/', indexRoutes);                          //using routes

// sockets
require('./sockets')(io);                           //using sockets

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
server.listen(app.get('port'), () => {
    console.log('Server is running on port', app.get('port'));
});