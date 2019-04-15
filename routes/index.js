var express = require('express');
var router = express.Router();

// Require controllers
var indexcontroller = require('../controllers/index');


router.get('/', indexcontroller.create_get);
router.post('/', indexcontroller.create_post);


module.exports = router;