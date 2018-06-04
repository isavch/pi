const express = require('express');
const socketIO = require('socket.io');

const path = require('path');

const PORT = process.env.PORT || 3000;
const SECRET_TOKEN = process.env.SECRET_TOKEN || 'pass@123';
const INDEX = path.join(__dirname, '../dist/index.html');

const server = express()
  .use(express.static(path.resolve(__dirname, '../dist')))
  .get('/api/login', (req, res) => {
    const secret = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
    const status = secret === SECRET_TOKEN ? 200 : 401;

    return res.sendStatus(status);
  })
  .get('/*', (req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

// io.use((socket, next) => {
//   const secret = socket.request.headers.authorization && Buffer.from(socket.request.headers.authorization, 'base64').toString('ascii');

//   if (secret === SECRET_TOKEN) {
//     return next();
//   };
//   next(new Error('Authentication error'));
// });

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('photo:take', options => {
    console.log('photo:take');
    socket.broadcast.emit('photo:take', options);
  });

  socket.on('video:take', options => {
    console.log('video:take', options);
    socket.broadcast.emit('video:take', options);
  });

  socket.on('video:stop', () => {
    console.log('video:stop');
    socket.broadcast.emit('video:stop');
  });

  socket.on('video:data', data => {
    console.log('video:data');
    socket.broadcast.emit('video:data', data);
  });
  
  socket.on('sensor', msg => {
    console.log('sensor message', msg);
    socket.broadcast.emit('sensor', msg);
  });

  socket.on('photo', msg => {
    console.log('photo message', msg);
    socket.broadcast.emit('photo', msg);
  });

  socket.on('photo:finish', () => {
    console.log('Photo end!!!!!');
    socket.broadcast.emit('photo:finish');
  });

  socket.on('photo:start', msg => {
    socket.broadcast.emit('photo:start', msg);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});