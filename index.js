var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {cName:req.session.cNames,masaCount:req.session.masaSayisi});
});

module.exports = router;
