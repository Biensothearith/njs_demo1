const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const admin = require("firebase-admin");
var cors = require('cors')
fs = require('fs');

app.use(cors())

var mysql = require('mysql');
var pool  = mysql.createPool({
   host: '127.0.0.1',
   port: 3306,
   user: 'root',
   password: 'root',
   database: 'demo1',
   // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
global.defultBranchID = 1;
global.pool = pool;
//DEFAULT LANGUAGE
global.lang = 'kh';
//DEFAULT PAGE LIMIT
global.row_count = 20;
global.row_count_data = 10;

global.server_path = "/Users/themacstore/Projects/NodeJS/NJS_MST_express";
global.file_upload_path = "/Users/themacstore/Projects/NodeJS/NJS_MST_express/data/files/";

var serviceAccount = require(server_path+"/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
global.admin_firebase = admin

global.verifyTokenSMS = function (req, res, next) {
   // console.log('req.path', req.path);
   if(req.path === "/phone"){
      jwt.verify(req.body.tokenSMS,(req.body.phone), function (err, data) {
         if (err) {
            res.status(400).json({
               message: err,
            });
         } else {
            if (data && data.data.smsCode == req.body.smsCode) {
               console.log();
            next();
            } else {
            res.status(400).json({
               message: "invalid_sms",
            });
            }
         }
      });
   }else{
      var bearerToken = getBearer(req);
      if (bearerToken) {
         jwt.verify(bearerToken,(req.body.phone), function (err, data) {
            if (err) {
               res.status(400).json({
                  message: err,
               });
            } else {
               if (data && data.data.smsCode == req.body.smsCode) {
                  console.log();
               next();
               } else {
               res.status(400).json({
                  message: "invalid_sms",
               });
               }
            }
         });
      } else {
         res.status(400).json({
            message: "invalid_token",
         });
      }
   }
}

const login = require('./api/routes/login');
const admin_menu = require('./api/routes/menu-admin');
const user = require('./api/routes/user-admin');
const permission = require('./api/routes/user-permission');
const buyer = require('./api/routes/buyer');
const seller = require('./api/routes/seller');
const driver = require('./api/routes/driver');
const branch = require('./api/routes/branch');
const enter_data = require('./api/routes/enter-data');
const tracker = require('./api/routes/tracker');
const report = require('./api/routes/report');
const zone = require('./api/routes/zone');
const grant_report = require('./api/routes/grant-report');
const change_branch = require('./api/routes/change-branch');
const count_data = require('./api/routes/count-data');
const required_booking = require('./api/routes/required-booking');
const carried_amount = require('./api/routes/carried-amount');
const slides = require('./api/routes/slides');
const site_description_admin = require('./api/routes/site-description');
const branch_report_monthly = require('./api/routes/branch-report-monthly');
const report_monthly_by_branch = require('./api/routes/report-monthly-by-branch');


// app 
const app_login = require("./api/routes_app/login");
const app_home = require("./api/routes_app/home");
const app_report = require("./api/routes_app/report");
const app_scan = require("./api/routes_app/scan");
const app_user_profile = require("./api/routes_app/user_profile");
const app_get_list = require("./api/routes_app/get_list");
const app_count_home=require("./api/routes_app/count_home")
const user_password = require('./api/routes_app/user_password'); 
const current_location = require('./api/routes_app/currentLocation'); 
const send_notification=require('./api/routes_app/send_notification');
const update_notification_token=require('./api/routes_app/update_notification_token');
const site_description=require('./api/routes_app/site_description');
const get_app_version=require('./api/routes_app/get_app_version');
const get_all_notification=require('./api/routes_app/get_allNotification');
const get_slide=require('./api/routes_app/slides');
const send_requireBooking=require('./api/routes_app/send_requireBooking');
const search = require('./api/routes_app/search');
const app_branch = require('./api/routes_app/branch');
const app_user = require('./api/routes_app/user');
const account_report = require('./api/routes_app/account-report');
const app_enter_data = require('./api/routes_app/enter-data');
const report_driver = require('./api/routes_app/report-driver');
const online_payment = require('./api/routes_app/online-payment');

//web
const branchLocation = require('./api/routes_app/branchLocation');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
   req.header("Access-Control-Allow-Origin", "*");
   req.header("Access-Control-Allow-Credentials", "true");
   req.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   req.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
   next();
});

var getIP = require('ipware')().get_ip;
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    next();
});

app.use('/login', requestParams, login);
app.use('/tracker', requestParams, tracker);
app.use('/menu-admin', requestParams, verifyToken, verifyPermission, admin_menu);
app.use('/drawer', requestParams, verifyToken, admin_menu);
app.use('/user-admin', requestParams, verifyToken, verifyPermission, user);
app.use('/user-permission', requestParams, verifyToken, verifyPermission, permission);
app.use('/buyer', requestParams, verifyToken, verifyPermission, buyer);
app.use('/driver', requestParams, verifyToken, verifyPermission, driver);
app.use('/seller', requestParams, verifyToken, verifyPermission, seller);
app.use('/branch', requestParams, verifyToken, verifyPermission, branch);
app.use('/enter-data', requestParams, verifyToken, verifyPermission, enter_data);
app.use('/report', requestParams, verifyToken, report);
app.use('/zone', requestParams, verifyToken, verifyPermission, zone);
app.use('/grant-report', requestParams, verifyToken,verifyPermission, grant_report);
app.use('/change-branch', requestParams, verifyToken,verifyPermission, change_branch);
app.use('/count-data', requestParams, verifyToken,count_data);
app.use('/required-booking', requestParams, verifyToken,verifyPermission, required_booking);
app.use('/carried-amount', requestParams, verifyToken, verifyPermission, carried_amount);
app.use('/slides', requestParams, verifyToken, verifyPermission, slides);
app.use('/site-description', requestParams, verifyToken, verifyPermission, site_description_admin);
app.use('/branch-report-monthly', requestParams, verifyToken, verifyPermission, branch_report_monthly);
app.use('/report-monthly-by-branch', requestParams, verifyToken, verifyPermission, report_monthly_by_branch);


// app
app.use('/app/login', app_login); //
app.use('/app/home', verifyToken, app_home);
app.use('/app/report', verifyToken, app_report);//
app.use('/app/scan', verifyToken, app_scan);
app.use('/app/user_profile', verifyToken, app_user_profile);
app.use('/app/get_list', verifyToken, app_get_list);
app.use('/app/count_home', verifyToken, app_count_home);
app.use('/app/user_password', verifyToken, user_password);
app.use('/app/current_location', verifyToken, current_location);
app.use('/app/send_notification', verifyToken, send_notification);
app.use('/app/update_notification_token', verifyToken, update_notification_token); //
app.use('/app/site_description', site_description);
app.use('/app/get_app_version', get_app_version); 
app.use('/app/get_all_notification',verifyToken, get_all_notification); //
app.use('/app/get_slide',verifyToken, get_slide); //
app.use('/app/send_requirebooking',verifyToken, send_requireBooking); //
app.use('/app/search',verifyToken, search); //
app.use('/app/get-branch',verifyToken, app_branch); //
app.use('/app/site-description', getSiteDescription); //
app.use('/app/user', verifyToken, app_user); //
app.use('/app/account-report', verifyToken, account_report); //
app.use('/app/enter-data', verifyToken, app_enter_data); //
app.use('/app/report-driver', verifyToken, report_driver); //
app.use('/app/online-payment', verifyToken, online_payment); //
app.use('/app/slide',express.static(__dirname+'/data/files/slide')); //
app.use('/app/site',express.static(__dirname+'/data/files/site')); //
app.use('/app/payment',express.static(__dirname+'/data/files/payment')); //
app.use('/app/images',express.static(__dirname+'/data/files')); //

//web
app.use('/web/branch-location',branchLocation)

app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error:{
         message: error.message
      }
   });
});

function verifyToken(req, res, next) {
   var bearerToken = getBearer(req)
   if(bearerToken) {
      var user = jwt.decode(bearerToken);
      if(user){
         req.userDataFromToken = user.data;
         next();
      }else{
         res.status(401).json({
            message: 'invalid_token',
         }); 
      }
   }else {
      res.status(401).json({
         message: 'invalid_token',
      }); 
   }
}

// Delete Token
function deleteToken(req, res, next) {
   var bearerToken = getBearer(req)
   if(bearerToken) {
     next();
   }
}

function getBearer(req){
   var bearerToken = false;
   const bearerHeader = req.headers['authorization'];
   // console.log(req.headers); 
   
   if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      bearerToken = bearer[1];
   }
   return bearerToken;
}

function requestParams(req, res, next) {
   next();
   // console.log('request', req.params, req.body);
}

function verifyPermission(req, res, next) {
   var page = req.baseUrl
   var path = req.path
   page = page.replace(/\//g, '');
   path = path.split("/");
   path = path[1];
   var userData = req.userDataFromToken;
   
   if(userData.usaType === 1){  
      next()
   }else{
      var sql = `SELECT pmaView, pmaInsert, pmaDelete, pmaUpdate FROM tblPermissionAdmin 
      JOIN tblMenuAdmin ON pma_madAutoID = madAutoID 
      WHERE pma_usaAutoID = ? AND madPageName = ?`;
      var dataSql = [userData.usaAutoID,page];
      pool.getConnection(function(err, connection) {
         if(err){
            res.status(402).json({
                  err: err,
            });
         }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                  connection.release();
                  if(error){
                     res.status(402).json({
                        error: error,
                     });
                  }else{
                     if(results.length > 0){
                        var data = results[0];
                        if(path == 'view'){
                           if(data.pmaView == 1){
                              next()
                           }else{
                              res.status(402).json({
                                 message: 'no_permission',
                                 dataSql
                              });
                           }
                        }else if(path == 'insert'){
                           if(data.pmaInsert == 1){
                              next()
                           }else{
                              res.status(402).json({
                                 message: 'no_permission',
                                 dataSql
                              });
                           }
                        }else if(path == 'delete'){
                           if(data.pmaDelete == 1){
                              next()
                           }else{
                              res.status(402).json({
                                 message: 'no_permission',
                                 dataSql
                              });
                           }
                        }else if(path == 'update'){
                           if(data.pmaUpdate == 1){
                              next()
                           }else{
                              res.status(402).json({
                                 message: 'no_permission',
                                 dataSql
                              });
                           }
                        }else{
                           res.status(402).json({
                              message: 'no_permission',
                              dataSql
                           });
                        }
                     }else{
                        res.status(402).json({
                           message: 'no_permission',
                           dataSql
                        });
                     }
                  }
            });
         }
      });
   }
}

global.checkPhoneDuplicate = function (phone, callback) {
   var sql = `
     SELECT * FROM seller_driver WHERE phone = ?
   `;
   var sqlData = [phone]
   pool.getConnection(function(err, connection) {
      if(err){
         return callback({
            code:400,
            message: err,
         });
      }else{
         connection.query(sql, sqlData, function (error, results, fields) {
               connection.release();
               if(error){
                  return callback({
                     code:400,
                     message: error,
                  });
               }else{
                  if(results.length > 0){
                     return callback({
                           code:400,
                           message: 'duplicate_number',
                     });
                  }else{
                     return callback({
                           code:200,
                           message: 'success',
                     });
                  }
               }
         });
      }
   });
}

global.getRandomDriver = function (braID, requestType, callback) {
   var sql = `
      SELECT driAutoID 
      FROM tblDriver 
      WHERE driBusy = 0 AND dri_braAutoID = ? AND driType = ?
      ORDER BY driLastShipDateTime ASC LIMIT 1
   `;
   var dataSql = [braID, requestType]
   pool.getConnection(function(err, connection) {
      if(err){
         return callback({
            code:400,
            message: err,
         });
      }else{
         connection.query(sql, dataSql, function (error, results, fields) {
               connection.release();
               if(error){
                  return callback({
                     code:400,
                     message: error,
                  });
               }else{
                  if(results.length > 0){
                     return callback({
                           code:200,
                           message: 'success',
                           driAutoID:results[0].driAutoID
                     });
                  }else{
                     // return callback({
                     //       code:400,
                     //       message: 'all_drivers_busy',
                     // });
                     return callback({
                           code:200,
                           message: 'success',
                           driAutoID:null
                     });
                  }
               }
         });
      }
   });
}

global.sendNotification = function (type, id, data) {
   if(type == 'seller' || type == 'driver'){
      if(type == 'seller'){
         var sql = `
            SELECT selPushyToken as token FROM tblSeller WHERE selAutoID = ? AND selPushyToken IS NOT NULL 
         `;
      }else{
         var sql = `
            SELECT driPushyToken as token FROM tblDriver WHERE driAutoID = ? AND driPushyToken IS NOT NULL
         `;
      }
      var dataSql = [id]
      pool.getConnection(function(err, connection) {
         if(err){
            console.log('sendNotification', err);
         }else{
            connection.query(sql, dataSql, function (error, results, fields) {
               connection.release();
               if(error){
                  console.log('sendNotification', error);
               }else{
                  if(results.length > 0){
                     var token = results[0].token
                     var title = data.title;
                     var messageInput = data.message;
                     var typeMessange = data.typeMessange;
                     var dataNotify = data.data;
                     var message = {
                        notification: {
                           title: title,
                           body: messageInput, // replace body.message,
                        },
                        android: {
                           priority: "high",
                           notification: {
                                 sound: "default",
                                 channel_id: "default_notification_channel_id",
                           },
                        },
                        apns: {
                           payload: {
                                 aps: {
                                    sound: "default",
                                    badge: 1,
                                 },
                           },
                        },
                        data: {
                           typeMessange:typeMessange,
                           body: messageInput,
                           data: JSON.stringify(dataNotify)
                        },
                        token: token,
                     };
                     console.log('message', message);
                     admin_firebase.messaging().send(message).then((response) => {
                        console.log("Successfully sent message:", response);
                        
                     }).catch((error) => {
                        console.log("Error sent message:", error);
                     });
                  }else{
                     console.log('sendNotification', 'no token to send');
                  }
               }
            });
         }
      });
   }else{
      if(type == 'allDevices'){
         var title = data.title;
         var message = data.message.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 120);
         var typeMessange = data.typeMessange;
         var dataNotify = data.data;
         var topic = 'allDevices';
         var message = {
            notification: {
               title: title,
               body: message,
            },
            android: {
               priority: "high",
               notification: {
                  sound: "default",
                  channel_id: "default_notification_channel_id",
               },
            },
            apns: {
               payload: {
                  aps: {
                  sound: "default",
                  badge: 1,
                  },
               },
            },
            data: {
               typeMessange: typeMessange,
               body: message,
               data: JSON.stringify(dataNotify)
            },
            topic: topic
         };
         admin_firebase.messaging().send(message)
         .then((response) => {
            console.log('response', response);
         })
         .catch((error) => {
            console.log('error', error);
         });
      }
   }
}

function getSiteDescription(req, res) {
   var sql = `
      SELECT sidSiteName as siteName, sidKeyword as keyword, sidCopyRight as copyRight, 
      sidEmail as email, sidReceiveEmail as receiveEmail, sidPhone as phone, 
      sidAddress as address, sidLogo as logo,
      sidAppVersionSeller as sellerAppVersion, sidAppVersionDriver as appDriverVersion, 
      sidBuyTrainUrl as trainURL, sidPrivacyPolicy AS privacyPolicy, sidRate as dollarRate FROM tblSiteDescription LIMIT 1
   `;
   pool.getConnection(function(err, connection) {
      if(err){
         res.status(400).json({
            message: err,
         });
      }else{
         connection.query(sql, function (error, results, fields) {
               connection.release();
               if(error){
                  res.status(400).json({
                     message: error,
                  });
               }else{
                  if(results.length > 0){
                     res.status(200).json({
                           message: 'success',
                           data:results
                     });
                  }else{
                     res.status(400).json({
                           message: 'invalid',
                     });
                  }
               }
         });
      }
   });
}

global.checkFreeDriver = function(driverID) {
   var sql = `
      SELECT * FROM tblEnterData 
      WHERE endDelayDate IS NULL AND endReceiveStatus = 0 AND end_driAutoID = ?
   `;
   var dataSql = [driverID]
   pool.getConnection(function(err, connection) {
      if(err){
         console.log(err);
      }else{
         connection.query(sql, dataSql, function (error, results, fields) {
               if(error){
                  connection.release();
                  console.log(error);
               }else{
                  if(results.length > 0){
                     connection.release();
                     console.log('not yet free');
                  }else{
                     var sql = `
                        UPDATE tblDriver SET driBusy = 0 WHERE driAutoID = ?
                     `;
                     var dataSql = [driverID]
                     connection.query(sql, dataSql, function (error, results, fields) {
                        connection.release();
                        if(error){
                           console.log(error);
                        }else{
                           if(results.affectedRows){
                              console.log('free now');
                           }else{
                              console.log('update free error');
                           }
                        }
                     });
                  }
               }
         });
      }
   });
}


global.generateAlias = function (item){
   var lower = item.toLowerCase();
   var alias = lower.replace(/ /g, '-');
   alias = alias.replace(/&/g, '-');
   alias = alias.replace(/\//g, '-');
   alias = alias.replace(/\\/g, '-');
   alias = alias.replace(/----/g, '-');
   alias = alias.replace(/---/g, '-');
   alias = alias.replace(/--/g, '-');
   return alias;
}

module.exports = app;