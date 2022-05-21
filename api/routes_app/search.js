const express = require("express")
const router = express.Router()

//0 waiting select drive
//1 waiting ship out 
//2 recive
//3 return 
//4 delay product

router.get("/seller/:id",(req, res, next)=>{
      var user = req.userDataFromToken
      var id = req.params.id
      var dateDrive = new Date
      var sql = `SELECT endAutoID AS id, end_selAutoID AS sellerID,
      IF(endReturned = 1,
            3,
            IF(endDoneStatus = 1 || endReceiveStatus = 1,
                  2,
                  IF(endDelayDate IS NOT NULL,
                        4,
                        IF(end_driAutoID IS NOT NULL,
                              1,
                              0  
                        )
                  )
            )
      ) as status,
      end_driAutoID AS driverID, endMoneyGetCustomerKH as driverFeeKH, endDriverFeeEN as driverFeeEN,
      endDatetime AS dateTime, endDateTimeOut AS dateTimeOut, endStoreName AS storeName,
      endSenderPhone AS senderPhone, endReceiverPhone AS receiverPhone, endLocation AS location,
      endZone AS zone, endReceiverAddress AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,
      endProductType AS productType,driName AS driverName, driPhone AS driverPhone, selAddress as sellerAddress,
      endNote AS note, endProductPriceEN as productEN FROM tblEnterData 
      JOIN tblSeller ON end_selAutoID = selAutoID
      LEFT JOIN tblDriver ON end_driAutoID = driAutoID
      WHERE endAutoID = ?`
      var dataSql = [id, user.ID]
      pool.getConnection(function(err, connection) {
            if(err){
                  res.status(400).json({
                      err: err,
                  });
              }else{
                  connection.query(sql, dataSql, function (error, results, fields) {
                        connection.release();
                        if(error){
                              res.status(400).json({
                                  error: error,
                              });
                        }else{
                              if(results.length > 0){
                                    res.status(200).json({
                                          message:"success",
                                          data:results
                                    })
                              }else{
                                    res.status(200).json({
                                          message:"success",
                                          data:[]
                                    }) 
                              }
                        }
                  })
            }
      });
});

router.get("/driver/:id",(req, res, next)=>{
      var user = req.userDataFromToken
      var id = req.params.id
      var dateDrive = new Date
      var sql = `SELECT endAutoID AS id, end_selAutoID AS sellerID,
      IF(endReturned = 1,
            3,
            IF(endDoneStatus = 1 || endReceiveStatus = 1,
                  2,
                  IF(endNoteDelivery IS NOT NULL,
                        4,
                        IF(end_driAutoID IS NOT NULL,
                              1,
                              0  
                        )
                  )
            )
      ) as status,
      end_driAutoID AS driverID, endMoneyGetCustomerKH as driverFeeKH, endDriverFeeEN as driverFeeEN,
      endDatetime AS dateTime, endDateTimeOut AS dateTimeOut, endStoreName AS storeName,
      endSenderPhone AS senderPhone, endReceiverPhone AS receiverPhone, endLocation AS location,
      endZone AS zone, endReceiverAddress AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,
      endProductType AS productType,driName AS driverName, driPhone AS driverPhone ,
      endNote AS note , endProductPriceEN as productEN FROM tblEnterData JOIN tblDriver ON end_driAutoID = driAutoID
      WHERE endAutoID = ? AND end_driAutoID = ?`
      var dataSql = [id, user.ID]
      pool.getConnection(function(err, connection) {
            if(err){
                  res.status(400).json({
                      err: err,
                  });
              }else{
                  connection.query(sql, dataSql, function (error, results, fields) {
                        connection.release();
                        if(error){
                              res.status(400).json({
                                  error: error,
                              });
                        }else{
                              if(results.length > 0){
                                    res.status(200).json({
                                          message:"success",
                                          data:results
                                    })
                              }else{
                                    res.status(200).json({
                                          message:"success",
                                          data:[]
                                    }) 
                              }
                        }
                  })
            }
      });
});

module.exports = router;