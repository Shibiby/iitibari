/* eslint-disable no-unused-vars */
const dbconfig = require('../config/database');
const mysql = require('mysql');

const connection = mysql.createConnection(dbconfig.connection);
const bcrypt = require('bcrypt-nodejs');

module.exports = function (app, passport) {
  app.get('/', isLoggedIn, (req, res) => {
    const row = [];
    const row2 = [];
    connection.query('select * from users where id = ?', [req.user.id], (err, rs) => {
      if (err) {
        console.log(err);
      } else {
        // if (rows.length) {
        //   // eslint-disable-next-line max-len
        //   for (let i = 0, len = rows.length; i < len; i++) {
        //     row[i] = rows[i];
        //   }
        // }
        console.log(rs);
      }

      res.render('index.ejs', { user: rs[0] });
    });
  });

  app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.get('/signup', (req, res) => {
    res.render('signup.ejs', { message: req.flash('message') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    console.log('hello');

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/');
  });
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}
