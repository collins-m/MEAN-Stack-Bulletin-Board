// getting dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');
const users = require('./routes/users');
const chats = require('./routes/chats');
const forums = require('./routes/forums');
const socketEvents = require('./socketEvents');

// connect to database
mongoose.connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true
}); 

mongoose.connection.on('connected', () => {
    console.log('connected to database', config.database);
});

mongoose.connection.on('error', () => {
    console.log('connection error:', err);
});

// initialise app with express
const app = express();

// port number
const port = 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
app.use('/chats', chats);
app.use('/forums', forums);

// index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// redirect invalid routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// set static folder
app.use(express.static(path.join(__dirname, "client")));

// starts server
server = app.listen(port, () => {
    console.log('Server started on port', port);
});

// socket.io
const io = require('socket.io').listen(server);
socketEvents(io);