const LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('./database');

const connection = mysql.createConnection(dbconfig.connection);

connection.query(`USE ${dbconfig.database}`);

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM users WHERE id = ? ', [id], (err, rows) => {
      done(err, rows[0]);
    });
  });

  passport.use(
    'local-signup',
    new LocalStrategy({

      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    ((req, username, password, done) => {
      connection.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
        if (err) return done(err);
        if (rows.length) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        }
        const newUserMysql = {
          username,
          password: bcrypt.hashSync(password, null, null)
        };

        const insertQuery = 'INSERT INTO users ( username, password ) values (?,?)';

        // eslint-disable-next-line max-len,no-shadow
        connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], (err, rows) => {
          newUserMysql.id = rows.insertId;

          return done(null, newUserMysql);
        });
      });
    }))
  );

  passport.use(
    'local-login',
    new LocalStrategy({

      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    ((req, username, password, done) => {
      connection.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
        if (err) return done(err);
        if (!rows.length) {
          return done(null, false, req.flash('loginMessage', 'No User Found!'));
        }

        if (!bcrypt.compareSync(password, rows[0].password)) return done(null, false, req.flash('loginMessage', 'Wrong Password!'));

        return done(null, rows[0]);
      });
    }))
  );
};
