var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt = require('jsonwebtoken');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter  = require('./routes/categories');
var userAdminRouter = require ('./routes/userAdmin');
var salesRouter = require('./routes/sales');

var app = express();
app.set('adminKey','passAdmin');
app.set('userKey','passUser');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** HEADER INICIO */
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  next();
});
app.options("/*",function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers','Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
  res.send(200);
});
/** header fin */


app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/categories', categoriesRouter);
app.use('/admin', userAdminRouter);
app.use('/sales',salesRouter);


function  validateUser(req,res,next){
  console.log(req.headers['tok'])
  jwt.verify(req.headers['tok'],req.app.get('userKey'),function (err,decoded){
    if(err){
      res.json({message:err.message})
    }else{
      console.log(decoded)
      req.body.tokenData = decoded;
      next();
    }
  })
}
app.validateUser = validateUser;

function  validateAdmin(req,res,next){
  console.log(req.headers['token'])
  jwt.verify(req.headers['token'],req.app.get('adminKey'),function (err,decoded){
    if(err){
      res.json({message:err.message})
    }else{
      console.log(decoded)
      req.body.tokenData = decoded;
      next();
    }
  })
}
app.validateAdmin = validateAdmin;


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
