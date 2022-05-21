const express = require("express")
const router = express.Router()

//1 all => "" 
//2 success =>  "WHERE endDoneStatus = 1"
//3 return => "endReturned = 1" 
//4 delay => "endNoteDelivery IS NOT NULL AND end_driAutoID IS NOT NULL AND endDoneStatus = 0 endPrintStatus = 0" 


router.get("/:date/:type",(req, res, next)=>{
      var user = req.userDataFromToken
      var date = req.params.date
      var type = req.params.type
      var sql = ''
      if(type == 'all'){
            sql = `
                  SELECT endAutoID AS id, end_selAutoID AS sellerID,
                  IF(endReturned = 1,
                        3,
                        IF(endDoneStatus = 1,
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
                  end_driAutoID AS driverID, endDriverFeeKH as driverFeeKH, endDriverFeeEN as driverFeeEN,
                  endDatetime AS dateTime, endDateTimeOut AS dateTimeOut, endStoreName AS storeName,
                  endSenderPhone AS senderPhone, endReceiverPhone AS receiverPhone, endLocation AS location,
                  endZone AS zone, endReceiverAddress AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,
                  endProductType AS productType,driName AS driverName, driPhone AS driverPhone , selAddress as sellerAddress,
                  endNote AS note, endProductPriceEN as productEN FROM tblEnterData 
                  JOIN tblDriver ON end_driAutoID = driAutoID
                  JOIN tblSeller ON end_selAutoID = selAutoID
                  WHERE end_selAutoID = ? AND DATE(endDatetime) = ?  
            `
      }else if(type == 'delay'){
            sql = `
                  SELECT endAutoID AS id, end_selAutoID AS sellerID,
                  IF(endReturned = 1,
                        3,
                        IF(endDoneStatus = 1,
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
                  end_driAutoID AS driverID, endDriverFeeKH as driverFeeKH, endDriverFeeEN as driverFeeEN,
                  endDatetime AS dateTime, endDateTimeOut AS dateTimeOut, endStoreName AS storeName,
                  endSenderPhone AS senderPhone, endReceiverPhone AS receiverPhone, endLocation AS location,
                  endZone AS zone, endReceiverAddress AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,
                  endProductType AS productType,driName AS driverName, driPhone AS driverPhone, selAddress as sellerAddress,
                  endNote AS note, endProductPriceEN as productEN FROM tblEnterData 
                  JOIN tblDriver ON end_driAutoID = driAutoID
                  JOIN tblSeller ON end_selAutoID = selAutoID
                  WHERE end_selAutoID = ? AND DATE(endDatetime) = ? AND endNoteDelivery IS NOT NULL AND end_driAutoID IS NOT NULL AND endDoneStatus = 0 AND endPrintStatus = 0 
            `
      }else if(type == 'success'){
            sql = `
                  SELECT endAutoID AS id, end_selAutoID AS sellerID,
                  IF(endReturned = 1,
                        3,
                        IF(endDoneStatus = 1,
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
                  end_driAutoID AS driverID, endDriverFeeKH as driverFeeKH, endDriverFeeEN as driverFeeEN,
                  endDatetime AS dateTime, endDateTimeOut AS dateTimeOut, endStoreName AS storeName,
                  endSenderPhone AS senderPhone, endReceiverPhone AS receiverPhone, endLocation AS location,
                  endZone AS zone, endReceiverAddress AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,
                  endProductType AS productType,driName AS driverName, driPhone AS driverPhone, selAddress as sellerAddress,
                  endNote AS note, endProductPriceEN as productEN FROM tblEnterData 
                  JOIN tblDriver ON end_driAutoID = driAutoID
                  JOIN tblSeller ON end_selAutoID = selAutoID
                  WHERE end_selAutoID = ? AND DATE(endDatetime) = ? AND endDoneStatus = 1
            `
      }else if(type == 'return'){
            sql = `
                  SELECT endAutoID AS id, end_selAutoID AS sellerID,
                  IF(endReturned = 1,
                        3,
                        IF(endDoneStatus = 1,
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
                  end_driAutoID AS driverID, endDriverFeeKH as driverFeeKH, endDriverFeeEN as driverFeeEN,
                  endDatetime AS dateTime, endDateTimeOut AS dateTimeOut, endStoreName AS storeName,
                  endSenderPhone AS senderPhone, endReceiverPhone AS receiverPhone, endLocation AS location,
                  endZone AS zone, endReceiverAddress AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,
                  endProductType AS productType,driName AS driverName, driPhone AS driverPhone, selAddress as sellerAddress,
                  endNote AS note, endProductPriceEN as productEN FROM tblEnterData 
                  JOIN tblDriver ON end_driAutoID = driAutoID
                  JOIN tblSeller ON end_selAutoID = selAutoID
                  WHERE end_selAutoID = ? AND DATE(endDatetime) = ? AND endReturned = 1
            `
      }
      var dataSql = [user.ID, date]
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
      })
      
})

module.exports = router;