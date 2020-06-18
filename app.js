const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const morgan = require('morgan');

const port = 4000;

const handleCorsPolicy = require('./code/middlewares').handleCorsPolicy;
const loginHandler = require('./routes/loginRouter');
const usersRouter = require('./routes/usersRouter');
const listingsRouter = require('./routes/listingsRouter');
const offersRouter = require('./routes/offersRouter');
// const chatsRouter = require('./routes/chatsRouter');

app.use(morgan('dev')); // logger
app.use(express.json()); // parses request as JSON
app.use(express.urlencoded({ extended: false })); 

app.use('/', handleCorsPolicy);
app.use('/login', loginHandler);
app.use('/users', usersRouter);
app.use('/listings', listingsRouter);
app.use('/offers', offersRouter);
// app.use('/chats', chatsRouter);

// app.get('/', function(req, res) {
//   res.sendfile('index.html');
// });

// users = [];
// var nsp = io.of('/chats/1');
// nsp.on('connection', function(socket) {
//   console.log('A user connected');
//   socket.on('setUsername', function(data) {
//      console.log(data);
     
//      if(users.indexOf(data) > -1) {
//         socket.emit('userExists', data + ' username is taken! Try some other username.');
//      } else {
//         users.push(data);
//         socket.emit('userSet', {username: data});
//      }
//   });
  
//   socket.on('msg', function(data) {
//     nsp.emit('newmsg', data); //Send message to everyone in the namespace
//   })
// });

// const dynamicNsp = io.of(/^\/chats\/\d+$/).on('connect', (socket) => {
//   const nsp = socket.nsp; // nsp.name === '/chats/1'
//   socket.on('msg', data => {
//     // write to db
//     nsp.emit('newMsg', data); // send message to everyone
//   })
// });

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
  // res.render('error', { error: err });
});

http.listen(port, () => console.log(`Furni listening at http://localhost:${port}`))