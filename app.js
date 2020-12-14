/* eslint-disable no-unused-vars */
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const debug = require('debug');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

require('./config/passport.js')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));
app.set('views', './views');
app.set('view engine', 'ejs');

// required for passport
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const commons = {
  title: 'IITIBARI FARM',
  head: 'IITIBARI FARM'
};

require('./routes/authRoutes')(app, passport); // load our routes and pass in our app and fully configured passport

// Require user routes
const userRoutes = require('./routes/user.routes');
// Using as a middleware
app.use('/api/v1/users', userRoutes);

// const adminRoutes = require('./routes/adminRoutes');

// app.use('/', adminRoutes);

app.listen(port, () => {
  console.log(`listening on port ${chalk.green(port)}`);
});
