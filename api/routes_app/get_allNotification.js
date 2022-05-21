const express = require('express');
const router = express.Router();

router.get('/list/:page',(req, res, next) => {
      var user = req.userDataFromToken
      var sql = ""
      var page = req.params.page;
      var offset = (page - 1) * row_count ;

      if(user.typeAccount == "seller"){
            sql = `SELECT 
            noaAutoID AS id, 
            noaDateTime AS dateTime,
            noaTitle AS title,
            noaMessage AS showMessage,
            noaSeen AS seen,
            endAutoID AS productID,
            endStatus AS status
            FROM tblNotificationAll   
            WHERE (endSellerID = ${user['ID']})
            OR (endDriID IS NULL AND endSellerID IS NULL)
            GROUP BY noaAutoID
            ORDER BY noaAutoID DESC LIMIT ${offset}, ${row_count}`;
      }else{
            sql = `SELECT 
            noaAutoID AS id,
            noaDateTime AS dateTime,
            noaTitle AS title,
            endAutoID AS productID,
            endStatus AS status,
            noaMessage AS showMessage,
            noaSeen AS seen
            FROM tblNotificationAll
            WHERE (endDriID = ${user['ID']})
            OR (endDriID IS NULL AND endSellerID IS NULL)
            GROUP BY noaAutoID
            ORDER BY noaAutoID DESC LIMIT ${offset}, ${row_count}`;
            
      }
      pool.getConnection(function(err, connection) {
            if(err){
                  res.status(400).json({
                      err: err,
                  });
              }else{
                    
                  connection.query(sql, function (error, results, fields) {
                        connection.release();
                        if(error){
                              res.status(400).json({
                                  error: error,
                              });
                        }else{
                              if(results.length > 0){
                                    res.status(200).json({
                                          message:"success",
                                          data:results,
                                    }) 
                              } else{
                                    res.status(200).json({
                                          message:"success",
                                          data:[],
                                    })    
                              }
                        }
                  })
            }
      })
});

router.get('/count',(req, res, next) => {
      var user = req.userDataFromToken
      var sql = ""

      if(user.typeAccount == "seller"){
            sql = `SELECT COUNT(*) as notSeenCount
            FROM tblNotificationAll   
            WHERE (endSellerID = ${user['ID']} AND noaSeen = 0)
            OR (endDriID IS NULL AND endSellerID IS NULL AND noaSeen = 0)`;
      }else{
            sql = `SELECT COUNT(*) as notSeenCount
            FROM tblNotificationAll
            WHERE (endDriID = ${user['ID']} AND noaSeen = 0)
            OR (endDriID IS NULL AND endSellerID IS NULL  AND noaSeen = 0)`;
            
      }
      pool.getConnection(function(err, connection) {
            if(err){
                  res.status(400).json({
                      err: err,
                  });
              }else{
                    
                  connection.query(sql, function (error, results, fields) {
                        connection.release();
                        if(error){
                              res.status(400).json({
                                  error: error,
                              });
                        }else{
                              if(results.length > 0){
                                    res.status(200).json({
                                          message:"success",
                                          data:results,
                                    }) 
                              } else{
                                    res.status(200).json({
                                          message:"success",
                                          data:[],
                                    })    
                              }
                        }
                  })
            }
      })
});

router.post('/seen',(req, res, next)=>{
      var user = req.userDataFromToken
      if(user.typeAccount == "seller"){
            var sql = `UPDATE tblNotificationAll SET noaSeen = 1 WHERE endSellerID = ${user['ID']}`;
      }else{
            var sql = `UPDATE tblNotificationAll SET noaSeen = 1 WHERE endDriID = ${user['ID']}`;
      }
      pool.getConnection(function(err, connection) {
            if(err){
                  res.status(400).json({
                      err: err,
                  });
              }else{
                  connection.query(sql, function (error, results, fields) {
                        connection.release();
                        if(error){
                              res.status(400).json({
                                  error: error,
                              });
                        }else{
                              if(results.affectedRows){
                                    res.status(200).json({
                                          message:"success",
                                    }) 
                              }else{
                                    res.status(400).json({
                                          message:"invalid_id",
                                    })   
                              } 
                        }
                  })
            }
      })
});

module.exports = router;