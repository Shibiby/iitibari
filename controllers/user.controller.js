const User = require('../models/user.model');

exports.findAll = (req, res) => {
  User.findAll((err, user) => {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', user);
    // res.json(user);
    res.render('view_user', {
      user
    });
  });
};

