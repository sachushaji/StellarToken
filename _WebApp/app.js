var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const xlm = require('./utils/xlmtransfer');
var routes = require('./routes/xlmtransfer');
var checkbalance = require('./utils/checkbalance');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res) {
    res.render('xlmtransfer')
    
})

app.get('/txhistory',function(req,res) {
  res.render('txhistory')
  
})

app.get('/checkbalance',function(req,res) {
  res.render('checkbalance')
  
})


app.post('/xlmtransfer', xlm.sendXLM);

app.post('/checkbalance', checkbalance.checkbalance);


app.listen(3000);
console.log('Go to http://localhost:3000');

module.exports = app;
