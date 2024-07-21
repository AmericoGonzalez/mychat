/*var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

// comments
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dbUrl = 'mongodb+srv://developeragonzalez:V66RWwmODQPAZxeb@cluster0.8o1tq3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

var Message = mongoose.model('Message', {
    name: String,
    message: String
});

var messages = [
    { name: 'tim', message: 'hola' },
    { name: 'jane', message: 'hello' }
];



app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find({});
        res.send(messages);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});



app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body);
        await message.save();
        io.emit('message', req.body);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/messages', async (req, res) => {
    try {
        await Message.deleteMany({});
        io.emit('clear');
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.connect(dbUrl)

    .then(() => {
        console.log('Connected to MongoDB');
        var server = http.listen(3000, () => {
            console.log('server is listening on port', server.address().port);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

*/


var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
require('dotenv').config();  // Add this line

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dbUrl = process.env.MONGODB_URL;  // Use environment variable for MongoDB URL

var Message = mongoose.model('Message', {
    name: String,
    message: String
});

app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find({});
        res.send(messages);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body);
        await message.save();
        io.emit('message', req.body);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/messages', async (req, res) => {
    try {
        await Message.deleteMany({});
        io.emit('clear');
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })  // Add options for the connection
    .then(() => {
        console.log('Connected to MongoDB');
        var server = http.listen(process.env.PORT || 3000, () => {  // Use environment variable for port
            console.log('server is listening on port', server.address().port);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

    