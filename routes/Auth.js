let loaded = require('dotenv').config();

if (loaded.error) {
    throw loaded.error;
}

let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    if (req && req.body && req.body.email && req.body.password) {
        if (req.body.email === process.env.USER_EMAIL && req.body.password === process.env.USER_PASS) {
            const payload = { email: req.body.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).cookie('x-token', token, { httpOnly: true }).send({ message: "Successful Login" });
        } else {
            return res.status(403).send({ message: "Invalid Credentials" });
        }
    } else {
        return res.status(400).send({ message: "Bad Request"});
    }
});

router.get('/logout', (req, res) => {
    if (req) {
        
    } else {
        return res.status(400).send({ message: "Bad Request"});
    }
});

module.exports = router;