const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  var userData = req.userDataFromToken;
  let memAutoID = userData.ID;
  let token = req.body.token || '';  
  var sql="";
  if(userData['typeAccount'] === 'seller'){
    sql_ = "UPDATE `tblSeller` SET `selPushyToken`= ? WHERE selAutoID = ?";
  }else{
    sql_ = "UPDATE `tblDriver` SET `driPushyToken`= ? WHERE driAutoID = ?";
  }
  var dataSql_ = [token, memAutoID];
  console.log("dataSql_token ",token,userData)
  pool.getConnection(function(err, connection) {
      if(err){
          res.status(400).json({
              err: err,
          });
      }else{
          connection.query(sql_, dataSql_, function (error_, results_, fields_) {
              connection.release();
              if(error_){
                  res.status(400).json({
                      error: error_,
                  });
              }else{
                  if(results_.affectedRows){
                    admin_firebase.messaging().subscribeToTopic(token, 'allDevice')
                    .then(function(response) {
                      console.log('response', response);
                      res.status(200).json({
                        message: 'success',
                      });
                    })
                    .catch(function(error) {
                      console.log('error', error);
                      res.status(200).json({
                        message: 'success_error'
                      });
                    });
                  }
              }
          });
      }
  });
});

module.exports = router;