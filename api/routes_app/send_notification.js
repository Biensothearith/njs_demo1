const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  console.log('notify body', req.body);
  let idReciver = req.body.idReciver || "";
  let type = req.body.type || "";
  let data = req.body.data || null;
  let title= req.body.title || "";
  let messageInput = req.body.message || "empty message";
  let idProudct=req.body.idProudct?req.body.idProudct:null;
  let status =req.body.status;
  if (type == "driver") {
    var sql_ ="SELECT `driPushyToken` FROM `tblDriver` WHERE `driAutoID` = ?";
    var dataSql_ = [idReciver];
    var sqlInsert = "INSERT INTO `tblNotificationAll`(`noaTitle`, `noaMessage`, `endDriID`,`endAutoID`,`endStatus`) VALUES (?, ?, ?,?,?)";
    var dataInsert=[title,messageInput,idReciver,idProudct,status]
  
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log('error1',err)
        res.status(400).json({
          err: err,
        });
      } else {
        connection.query(sql_, dataSql_, function (error_, results_, fields_) {
          if (error_) {
             console.log('error2',error_)
            res.status(400).json({
              error: error_,
            });
          } else {
              if (results_.length > 0 && results_[0].driPushyToken) {
                var registrationToken = results_[0].driPushyToken;
                var message = {
                  notification: {
                    title: "អមតៈ ដឹកជញ្ជូន",
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
                  data: data,
                  token: registrationToken,
                };
                admin_firebase
                  .messaging()
                  .send(message)
                  .then((response) => {
                    console.log("Successfully sent message:", response);
                    res.status(200).json({
                      message: "success",
                      response: response,
                    });
                  })
                  .catch((error) => {
                    console.log("Error sending message:", error);
                    res.status(400).json({
                      message: "error",
                      error: error,
                    });
                  });

                  // connection.query(sqlInsert,dataInsert, function (error_, results__, fields_){
                  //     connection.release();
                  //     if (error_) {
                  //       res.status(400).json({
                  //         error: error_.code,
                  //       });
                  //     } 
                  //     if(results__){
                  //       res.status(200).json({
                  //           results: results__.insertId,
                  //           message: 'success',
                  //       }); 
                  //   }
                  //   }
                  // )

              } else {
                res.status(400).json({
                  message: "user_has_no_token",
                });
              }
          }
        });
      }
    });
  } else if (type == "seller") {
    var sql_ ="SELECT `selPushyToken` FROM `tblSeller` WHERE `selAutoID` = ?";
    var dataSql_ = [idReciver];
    var sqlInsert = "INSERT INTO `tblNotificationAll`(`noaTitle`, `noaMessage`, `endSellerID`,`endAutoID`,`endStatus`) VALUES (?, ?, ?,?,?)";
    var dataInsert=[title,messageInput,idReciver,idProudct,status]
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log('errorsel 1',err)
        res.status(400).json({
          err: err,
        });
      } else {
      
        connection.query(sql_, dataSql_, function (error_, results_, fields_) {
          // connection.release();
          if (error_) {
            console.log('errorsel 2',error_)
            res.status(400).json({
              error: error_,
            });
          } else {
            if (results_.length > 0 && results_[0].selPushyToken) {
              var registrationToken = results_[0].selPushyToken;
              var message = {
                notification: {
                  title: "អមតៈ ដឹកជញ្ជូន​",
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
                data: data,
                token: registrationToken,
              };
              admin_firebase
                .messaging()
                .send(message)
                .then((response) => {
                  console.log("Successfully sent message:", response);
                  res.status(200).json({
                    message: "success",
                    response: response,
                  });
                })
                .catch((error) => {
                  console.log("Error sending message:", error);
                  res.status(400).json({
                    message: "error",
                    error: error,
                  });
                });

              //   connection.query(sqlInsert,dataInsert, function (error_, results__, fields_){
              //       connection.release();
              //       if (error_) {
              //         res.status(400).json({
              //           error: error_.code,
              //         });
              //       } 
              //       if(results__){
              //         res.status(200).json({
              //             results: results__.insertId,
              //             message: 'success',
              //         }); 
              //     }
              //     }
              // )
            } else {
              console.log('errorsel 3,user_has_no_token')
              res.status(400).json({
                message: "user_has_no_token",
              });
            }
          }
        });
       
      }
    });
     
  } else if (type == "operator") {
    var sql_ = "SELECT `opeToken` FROM `tblOperator`";
    pool.getConnection(function (err, connection) {
      if (err) {
        res.status(400).json({
          err: err,
        });
      } else {
        connection.query(sql_, function (error_, results_, fields_) {
          connection.release();
          if (error_) {
            res.status(400).json({
              error: error_,
            });
          } else {
            if (results_.length > 0 && results_[0].opeToken) {
              var registrationToken = results_[0].opeToken;
              var message = {
                notification: {
                  title: "អមតៈ ដឹកជញ្ជូន",
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
                data: data,
                token: registrationToken,
              };
              admin_firebase
                .messaging()
                .send(message)
                .then((response) => {
                  console.log("Successfully sent message:", response);
                  res.status(200).json({
                    message: "success",
                    response: response,
                  });
                })
                .catch((error) => {
                  console.log("Error sending message:", error);
                  res.status(400).json({
                    message: "error",
                    error: error,
                  });
                });
            } else {
              res.status(400).json({
                message: "user_has_no_token",
              });
            }
          }
        });
      }
    });
  } else {
    res.status(400).json({
      message: "invalid_user_or_seller",
      response: response,
    });
  }
});

router.post("/all-devices", (req, res, next) => {
 // The topic name can be optionally prefixed with "/topics/".
  let messageTitle = req.body.title || "សាកប្រើសិន";
  let messageInput = req.body.message || "empty message";
  var topic = 'allDevices';
  var message = {
    notification: {
      title: messageTitle,
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
    topic: topic
  };
  // Send a message to devices subscribed to the provided topic.
  admin_firebase.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    res.status(200).json({
      message:response,
      hello:'hello'
    });
  })
  .catch((error) => {
    res.status(400).json({
      message:error,
      hello:'111'

    });
  });
});

module.exports = router;
