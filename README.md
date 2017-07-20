# RestourantProject
node.js work for restourant order system.

res.render('wizard', {cName:req.session.cNames, fiName:req.session.fName,laName:req.session.lName,uMail:req.session.usMail,uPhone:req.session.usPhone});

///

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.check==0 || req.session.check==null){
    res.render('login', {hata:req.session.hata });
} else if(req.session.kurulumKontrol==0){

        res.render('wizard', {cName:req.session.cNames, fiName:req.session.fName,laName:req.session.lName,uMail:req.session.usMail,uPhone:req.session.usPhone});

    }
    else{
        res.render('index', {cName:req.session.cNames,masaCount:req.session.masaSayisi});

    }

       // res.render('wizard', { cName:req.session.cNames });



});

module.exports = router;

