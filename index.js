const loaded = require('dotenv').config()

if (loaded.error) {
  throw loaded.error;
}

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./routes/Auth');

var router = express.Router();

app.use(express.static(__dirname + '/client/build'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());

require('./socket/socket')(io);

// io.on('connection', (socket) => {
//   console.log("User connected");
//   users.add(socket.id);

//   socket.emit('user list', socket.id, Array.from(users));
//   socket.emit('current data', data);
//   socket.broadcast.emit('connection', socket.id);

//   socket.on('notification', (header, msg) => {
//       if (header === APP_CONSTANTS.IO_EMIT) {
//           io.emit('notification', msg);
//       }
//   });

//   socket.on('data change', (amount) => {
//       for (element in data) {
//           data[element].value += amount;
//           if (data[element].value > ABOVE_THRESHOLD) {
//               io.emit('alert', "Above Threshold Alert", data[element].date + " went above " + ABOVE_THRESHOLD + "! Current value: " + data[element].value);
//           } else if (data[element].value < BELOW_THRESHOLD) {
//               io.emit('alert', "Below Threshold Alert", data[element].date + " went below " + BELOW_THRESHOLD + "! Current value: " + data[element].value);
//           }
//       }
//       io.emit('data change', data);
//   });

//   socket.on('set threshold', (threshold_type, amount) => {
//       if (threshold_type === "LOWER") {
//           BELOW_THRESHOLD = amount;
//       } else {
//           ABOVE_THRESHOLD = amount;
//       }
//   });

//   socket.on('disconnect', () => {
//       io.emit('disconnect', socket.id);
//       users.delete(socket.id);
//       console.log('User disconnected');
//   });

//   socket.on('sendPing', (id) => {
//       console.log("Received Ping");
//       socket.to(id).emit('receivedPing', socket.id + " sent a PING!");
//   });
// });

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

http.listen(port, () => {
  console.log('listening on *: ' + port);
});

app.use('/api', auth);
app.use('*', router);

module.exports = app; 