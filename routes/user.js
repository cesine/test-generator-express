var debug = require('debug')('route:user');
var express = require('express');
var router = express.Router();

/* simulate a store of users */
var USERS = {};

/* GET users listing. */
router.get('/', function(req, res) {
    debug('Returning users ', USERS);
    res.json(USERS);
});

/* GET a user */
router.get('/:userId', function(req, res) {
    if (!USERS[req.params.userId]) {
        next(new Error('User Not Found'));
    }
    debug('Returning a user ', USERS);
    res.json(USERS[req.params.userId]);
});

/* POST a new user */
router.post('/', function(req, res) {
    var user = req.body;

    // Simulate storing the user
    user.id = Date.now() + "";
    USERS[user.id] = user;

    res.json(user);
});

/* PUT an update to a user */
router.put('/:userId', function(req, res, next) {
    if (!USERS[req.params.userId]) {
        next(new Error('User Not Found'));
    }

    var user = req.body;

    user.id = req.params.userId;
    USERS[user.id] = user;

    res.json(user);
});

module.exports = router;
