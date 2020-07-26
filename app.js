const express = require('express');
const app = express();
const morgan = require('morgan');

const port = 4000;

const handleCorsPolicy = require('./code/middlewares').handleCorsPolicy;
const loginRouter = require('./routes/loginRouter');
const usersRouter = require('./routes/usersRouter');
const listingsRouter = require('./routes/listingsRouter');
const offersRouter = require('./routes/offersRouter');
const tagsRouter = require('./routes/tagsRouter');

app.use(morgan('dev')); // logger
app.use(express.json()); // parses request as JSON
app.use(express.urlencoded({ extended: false })); 

app.use('/', handleCorsPolicy);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/listings', listingsRouter);
app.use('/offers', offersRouter);
app.use('/tags', tagsRouter);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
  // res.render('error', { error: err });
});

app.listen(port, () => console.log(`Furni listening at http://localhost:${port}`))