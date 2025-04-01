var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bienvenidaRoutes = require('./routes/bienvenida');
const billeterasRoutes = require('./routes/billeteras');
const conversionRoutes = require('./routes/conversion');
const dashboardRoutes = require('./routes/dashboard');
const reportesRoutes = require('./routes/reportes');

// const transaccionesRouter = require('./routes/transacciones');
// const categoriasRouter = require('./routes/categorias');
const monedasRoutes = require('./routes/monedas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', bienvenidaRoutes);
app.use('/bienvenido', bienvenidaRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/reportes', reportesRoutes);
app.use('/billeteras', billeterasRoutes);
app.use('/conversion', conversionRoutes);

// app.use('/api/transacciones', transaccionesRouter);
// app.use('/api/categorias', categoriasRouter);
app.use('/api/monedas', monedasRoutes);

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
