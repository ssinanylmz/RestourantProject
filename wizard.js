/**
 * Created by PerforMonster on 8.12.2016.
 */
var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.check==0 || req.session.check==null){
        res.render('login', {error:null });
    } else{


        res.render('wizard', {cName:req.session.cNames, fiName:req.session.fName,laName:req.session.lName,uMail:req.session.usMail,uPhone:req.session.usPhone});

    }

    // res.render('wizard', { cName:req.session.cNames });




});




module.exports = router;
/**
 * Created by PerforMonster on 8.12.2016.
 */
