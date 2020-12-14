// const express = require('express');
// const passport = require('passport');
// const debug = require('debug')('app:adminRoutes');
// const mysql = require('mysql');
// const dbconfig = require('../config/database');
//
// const connection = mysql.createConnection(dbconfig.connection);
//
// const router = express.Router();
//
// router.get('/', (req, res) => {
//   const user = req.session;
//   const { userId } = req.session;
//
//   if (userId == null) {
//     res.redirect('/login');
//     return;
//   }
//   connection.query('SELECT * FROM users WHERE id = ?', req.query.id, (err, rs) => {
//     // console.log(rs);
//     res.render('index', {
//       user
//     });
//   });
// });
//
// // function router(nav) {
// //   adminRouter.route('/')
// //     .get((req, res) => {
// //       const user = req.session;
// //       const { userId } = req.session;
//
// //       if (userId == null) {
// //         res.redirect('/login');
// //         return;
// //       }
// //       connection.query('SELECT * FROM users WHERE id = ?', req.query.id, (err, rs) => {
// //         // console.log(rs);
// //         res.render('index', {
// //           user
// //         });
// //       });
// //     });
// //   return adminRouter;
// // }
// module.exports = router;
