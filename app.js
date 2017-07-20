var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var register = require('./routes/register');
var table = require('./routes/table');
var wizard = require('./routes/wizard');
var mongodb = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false });



var app = express();


var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/restProject';


app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))





var router = require("express");
var mongo = require("mongodb");

mongoose.connect('127.0.0.1:27017/restProject');
var Schema = mongoose.Schema;

var companyDataSchema = new Schema({
    companyName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    TC: String,
    birthdate: String,
    pPhoto: String,
    restID: String,
    phone: String
}, {collection: 'companyAccounts'});

var companyData = mongoose.model('companyData', companyDataSchema);

var SchemaRestorant = mongoose.Schema;

var restorantDataSchema = new SchemaRestorant({
    restorantName: String,
    bolgeAdi: String,
    subeAdi: String,
    subeIli: String,
    subeIlcesi: String,
    restorantMasaSayisi: Number,
    restorantMail: String,
    restorantTelefon: String,
    restorantLogo: String,
    kurulumKontrol: Number,
    restorantAdresi: String
}, {collection: 'restorantInformations'});

var restorantData = mongoose.model('restorantData', restorantDataSchema);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');






// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', login);
app.use('/login', login);
app.use('/register', register);
app.use('/table', table);
app.use('/wizard',wizard)

app.post('/register', function(req, res, next) {
    var companyAccount = {
        companyName:  req.body.sirketAdi,
        firstName:  req.body.ad,
        lastName:  req.body.soyad,
        email:  req.body.ePosta,
        password:  req.body.parola,
        TC: "",
        birthdate: "",
        pPhoto: "",
        restID: "",
        phone:  req.body.telefon,
        restID: ""





    };

    var data = new companyData(companyAccount);
    data.save();

    res.redirect('/login');
});

app.post('/wizard', function(req, res, next) {
    var restorantInformation = {
        restorantName:  req.body.sirket_adi,
        bolgeAdi:  req.body.bolge_adi,
        subeAdi:  req.body.sube_adi,
        subeIli:  req.body.sube_ili,
        subeIlcesi:  req.body.sube_ilcesi,
        restorantMail:  req.body.rest_mail,
        restorantTelefon:  req.body.rest_telefon,
        restorantLogo:  " ",
        restorantAdresi:  req.body.rest_adres,
        kurulumKontrol: 1,
        restorantMasaSayisi:  req.body.rest_masa_sayisi


    };

    var data = new restorantData(restorantInformation);
    data.save();


    MongoClient.connect(url, function(err, db) {
        var restAdi = req.body.sirket_adi;
        var subeName = req.body.sube_adi;

        var collection = db.collection('restorantInformations');
        // Insert some users
        collection.find({restorantName: restAdi, subeAdi: subeName}).toArray(function (err, result) {
            if (err) {
                console.log(err)
                req.session.check=0;
                res.redirect('/login');
            } else if (result.length) {

                req.session.rID=result[0]._id;

                console.log('Eklenen Restoran İD '+req.session.rID);

                var birthday=req.body.bday+'.'+req.body.bmonth+'.'+req.body.byear;
                MongoClient.connect(url, function(err, db) {
                    var collection = db.collection('companyAccounts');
                    var o_id = new mongo.ObjectID( req.session.uID);
                    var r_id = new mongo.ObjectID( req.session.rID);
                    console.log(o_id);
                    console.log(r_id);
                    collection.update(
                        { _id: o_id } ,
                        { $set: {
                            restID:r_id,
                            TC:req.body.tcNO,
                            phone:req.body.tel,
                            birthdate:birthday} }
                    );

                });

            } else {
                req.session.check=0;
                res.render('login', {hata:req.session.hata});
            }
            //Close connection
            db.close();
        });


    });





    res.redirect('/table');
});

app.get('/cikis', function(req, res) {

    req.session.check=0;
    res.redirect('/');
});

app.post('/', urlencodedParser, function (req, res) {
    MongoClient.connect(url, function(err, db) {
        var email = req.body.email;
        var kurulumCntrl;
        var password = req.body.password;
        var collection = db.collection('companyAccounts')
        var collectionRest = db.collection('restorantInformations');
               // Insert some users
        collection.find({email: email, password: password}).toArray(function (err, result) {
            if (err) {
                console.log(err);
                res.redirect('/login');
            } else if (result.length) {
                console.log('Found:', result);


                req.session.cNames=result[0].companyName;
                req.session.uID=result[0]._id;
                req.session.fName=result[0].firstName;
                req.session.lName=result[0].lastName;
                req.session.usMail=result[0].email;
                req.session.usPhone=result[0].phone;
                req.session.reID=result[0].restID;
                req.session.bdate=result[0].birthdate;
                req.session.check=1;





if(req.session.reID!=""){
                var r_id = new mongo.ObjectID(req.session.reID);

                collectionRest.find({_id:r_id}).toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                        res.redirect('/login');
                    } else if (result.length) {

                        req.session.masaSayisi=result[0].restorantMasaSayisi;
                        kurulumCntrl=result[0].kurulumKontrol;
                        if(kurulumCntrl==1){

                            res.render('index', {cName:req.session.cNames,masaCount:req.session.masaSayisi});
                        } else {

                            res.render('wizard', {cName:req.session.cNames, fiName:req.session.fName,laName:req.session.lName,uMail:req.session.usMail,uPhone:req.session.usPhone});
                        }

                        } else {
                        res.render('wizard', {cName:req.session.cNames, fiName:req.session.fName,laName:req.session.lName,uMail:req.session.usMail,uPhone:req.session.usPhone});   }
                        //Close connection
                        db.close();
                });


}else{
    res.render('wizard', {cName:req.session.cNames, fiName:req.session.fName,laName:req.session.lName,uMail:req.session.usMail,uPhone:req.session.usPhone});
}


            } else {
                req.session.hata="Kullanıcı adı veya şifre yanlış."
                res.render('login', {hata:req.session.hata});
            }
            //Close connection
            db.close();
        });


    });


});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
