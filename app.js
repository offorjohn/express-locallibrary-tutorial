const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const wiki = require("./routes/wiki.js");

const catalogRouter = require("./routes/catalog"); 

// Import routes for "catalog" area of site
const compression = require("compression");


const app = express(); 

// Set up mongoose connection



// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dev_db_url =
  "mongodb+srv://jon:jon1101@lms.8kbft.mongodb.net/?retryWrites=true&w=majority&appName=LMS";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, "public")));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

app.use("/wiki", wiki);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the erro r page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
