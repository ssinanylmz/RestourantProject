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

        res.render('table', {cName:req.session.cNames,masaCount:req.session.masaSayisi});
    }

    // res.render('wizard', { cName:req.session.cNames });


});




module.exports = router;
/**
 * Created by PerforMonster on 8.12.2016.
 */
