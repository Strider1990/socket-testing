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

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

http.listen(port, () => {
  console.log('listening on *: ' + port);
});

app.use('/api', auth);
app.use('*', router);

module.exports = app; 