const mysql = require('mysql');
const dbconfig = require('../config/database');

const dbConn = mysql.createConnection(dbconfig.connection);

const User = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.username = user.username;
  this.email = user.email;
  this.phone_number = user.phone_number;
  this.status = user.status ? user.status : 1;
  this.password = user.password;
  this.date_created = new Date();
  this.date_updated = new Date();
};

User.findAll = (result) => {
  dbConn.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('users: ', res);
      result(null, res);
    }
  });
};


module.exports = User;
