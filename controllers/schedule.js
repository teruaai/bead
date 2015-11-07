var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('list', { courses: null });
});

module.exports = router;