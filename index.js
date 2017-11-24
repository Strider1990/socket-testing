var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var APP_CONSTANTS = require('./constants/constants');
var port = process.env.PORT || 8080;

var BELOW_THRESHOLD = APP_CONSTANTS.DEFAULT_BELOW_ALERT_THRESHOLD;
var ABOVE_THRESHOLD = APP_CONSTANTS.DEFAULT_ABOVE_ALERT_THRESHOLD;

var data = [
  {
    date: '2017-01',
    value: 103
  },
  {
    date: '2017-02',
    value: 165
  },
  {
    date: '2017-03',
    value: 269
  },
  {
    date: '2017-04',
    value: 344
  },
  {
    date: '2017-05',
    value: 376
  },
  {
    date: '2017-06',
    value: 410
  },
  {
    date: '2017-07',
    value: 421
  },
  {
    date: '2017-08',
    value: 405
  },
  {
    date: '2017-09',
    value: 376
  },
  {
    date: '2017-10',
    value: 359
  },
  {
    date: '2017-11',
    value: 392
  },
  {
    date: '2017-12',
    value: 433
  },
  {
    date: '2018-01',
    value: 455
  },
  {
    date: '2018-02',
    value: 478
  }
];

var users = new Set();

var router = express.Router();

app.use(express.static(__dirname + '/public'));

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

router.post('/', (req, res) => {
  res.json(data);
});


/* Socket stuff
*/
io.on('connection', (socket) => {
  console.log("User connected");
  users.add(socket.id);

  socket.emit('user list', socket.id, Array.from(users));
  socket.emit('current data', data);
  socket.broadcast.emit('connection', socket.id);

  socket.on('notification', (header, msg) => {
    if (header === APP_CONSTANTS.IO_EMIT) {
      io.emit('notification', msg);
    }
  });

  socket.on('data change', (amount) => {
    for (element in data) {
      data[element].value += amount;
      if (data[element].value > ABOVE_THRESHOLD) {
        io.emit('alert', "Above Threshold Alert", data[element].date + " went above " + ABOVE_THRESHOLD + "! Current value: " + data[element].value);
      } else if (data[element].value < BELOW_THRESHOLD) {
        io.emit('alert', "Below Threshold Alert", data[element].date + " went below " + BELOW_THRESHOLD + "! Current value: " + data[element].value);
      }
    }
    io.emit('data change', data);
  });

  socket.on('set threshold', (threshold_type, amount) => {
    if (threshold_type === "LOWER") {
      BELOW_THRESHOLD = amount;
    } else {
      ABOVE_THRESHOLD = amount;
    }
  });

  socket.on('disconnect', () => {
    io.emit('disconnect', socket.id);
    users.delete(socket.id);
    console.log('User disconnected');
  });

  socket.on('sendPing', (id) => {
    console.log("Received Ping");
    socket.to(id).emit('receivedPing', socket.id + " sent a PING!");
  });
});

http.listen(port, () => {
  console.log('listening on *: ' + port);
});

app.use('/', router);

module.exports = app; 