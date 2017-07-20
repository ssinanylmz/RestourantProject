/**
 * Created by PerforMonster on 8.12.2016.
 */
var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'register Panel' });
});




module.exports = router;
/**
 * Created by PerforMonster on 8.12.2016.
 */
