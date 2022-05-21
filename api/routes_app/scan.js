const express = require("express")
const router = express.Router()

router.get("/:id",(req, res, next)=>{
      var user = req.userDataFromToken
      var id = req.params.id
      var dateDrive = new Date
      var sql = "SELECT `endAutoID` AS id, `end_selAutoID` AS sellerID,"+
      "`end_driAutoID` AS driverID, "+
      "`endDatetime` AS dateTime, `endDateTimeOut` AS dateTimeOut, `endStoreName` AS storeName, "+
      "`endSenderPhone` AS senderPhone, `endReceiverPhone` AS receiverPhone, `endLocation` AS location, "+
      "`endZone` AS zone, `endReceiverAddress` AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,"+
      "`endProductType` AS productType,`driName` AS driverName, `driPhone` AS driverPhone ," +
      "`endNote` AS note FROM `tblEnterData` JOIN `tblDriver` ON `end_driAutoID` = `driAutoID` "+
      "WHERE `endReceiveStatus` = 0 AND `endDoneStatus` = 0 AND `endClearStatus` = 0 AND `endAutoID` = '"+id+"'"
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
                                    var data = results[0]
                                    res.status(200).json({
                                          message:"success",
                                          results:data
                                    })
                              }else{
                                    var sql_ = `SELECT * FROM tblEnterData WHERE end_driAutoID IS NOT NULL AND endAutoID = ${id}`
                                    connection.query(sql_, function(error_, results__){
                                          if(error_){
                                                res.status(400).json({
                                                      error:error_,
                                                      message:"not_found"
                                                })
                                          }else{
                                                if(results__.length>0){
                                                      res.status(400).json({
                                                            message:"product_have_derver",
                                                      })
                                                }else{
                                                      var sql_ = "UPDATE tblEnterData SET end_driAutoID = ?, `endDateTimeDrive` = ? "+
                                                      "WHERE end_driAutoID IS NULL AND endAutoID = ?";
                                                      var dataSql_ = [user["ID"], dateDrive, id]
                                                      connection.query(sql_, dataSql_, function(error_, results_){
                                                            if(error_){
                                                                  res.status(400).json({
                                                                        error:error_,
                                                                        message:"can_not_get_product"
                                                                  })
                                                            }else{
                                                                  var _sql_ = "SELECT `endAutoID` AS id, `end_selAutoID` AS sellerID,"+
                                                                  "`end_driAutoID` AS driverID, "+
                                                                  "`endDatetime` AS dateTime, `endDateTimeOut` AS dateTimeOut, `endStoreName` AS storeName, "+
                                                                  "`endSenderPhone` AS senderPhone, `endReceiverPhone` AS receiverPhone, `endLocation` AS location, "+
                                                                  "`endZone` AS zone, `endReceiverAddress` AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,"+
                                                                  "`endProductType` AS productType," +
                                                                  "`endNote` AS note FROM `tblEnterData` WHERE`endAutoID`=? ";
                                                                        var _dataSql_ = [id]
                                                                        connection.query(_sql_, _dataSql_, function(error_, _results_){
                                                                              if(error_){
                                                                                    res.status(400).json({
                                                                                          error:error_,
                                                                                          message:"can't found"
                                                                                    })
                                                                              }else{
                                                                                    
                                                                                    res.status(200).json({
                                                                                          message:"set_driver_success",
                                                                                          results:_results_
                                                                                    })
                                                                              }
                                                                        })   
                                                            }
                                                      })   
                                                }
                                                
                                          }
                                    })   

                                    
                              }
                        }
                  })
            }
      });
});


router.post("/update",(req, res, next)=>{
      var id = req.body.id
      var commandNote=req.body.note
      var status = req.body.status
      var moneyGotEN = req.body.moneyGotEN || 0
      var moneyGotKH = req.body.moneyGotKH || 0

      var sql =  ""
      var dataSql = [moneyGotEN, moneyGotKH, id]
      if(status){
            sql = `UPDATE tblEnterData SET endDownStatus = 1,endNote = "${commandNote}" WHERE endAutoID= ${id}`
      }else{
            sql = "UPDATE `tblEnterData` SET "+
            "`endMoneyGotCustomerEN` = ?, `endMoneyGotCustomerKH` = ?, endDownStatus = 0, `endReceiveStatus` = 1 "+
            "WHERE `endAutoID` = ? "
      }

      pool.getConnection(function(err,connection){
            if(err){
                  res.status(400).json({
                        error:err
                  });
            }else{
                  connection.query(sql, dataSql,function(error, results){
                        connection.release();
                        if(error){
                              res.status(400).json({
                                    error:error
                              });
                        }else{
                              if(results.affectedRows > 0){
                                    res.status(200).json({
                                          message: "success",
                                    });
                              }else{
                                    res.status(400).json({
                                          message: "err_update"
                                    });
                              }
                              
                        }
                  });
            }
      });
});

module.exports = router;