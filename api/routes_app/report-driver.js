const express = require("express")
const router = express.Router()

//1 all => "" 
//2 success =>  "WHERE endDoneStatus = 1"
//3 return => "endReturned = 1" 
//4 delay => "endNoteDelivery IS NOT NULL AND end_driAutoID IS NOT NULL AND endDoneStatus = 0 endPrintStatus = 0" 

router.get("/list/:page",(req, res, next)=>{
      var user = req.userDataFromToken
      var page = req.params.page
      var offset = (page - 1) * row_count ;
      var sql = `
            SELECT selAutoID as sellerID, selName as sellerName, DATE(endDatetime) as dateTime 
            FROM tblEnterData JOIN tblSeller ON end_selAutoID = selAutoID
            WHERE end_driAutoID = ? 
            GROUP BY end_selAutoID, DATE(endDatetime)
            ORDER BY endDatetime DESC LIMIT ${offset}, ${row_count}
      `
      var dataSql = [user.ID]
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

router.get("/invoice/:date/:seller",(req, res, next)=>{
      var user = req.userDataFromToken
      var date = req.params.date
      var seller = req.params.seller || ''
      var sql = `SELECT endAutoID AS id, end_selAutoID AS sellerID,
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
      endProductType AS productType,driName AS driverName, driPhone AS driverPhone , selAddress as sellerAdress, 
      endNote AS note, endProductPriceEN as productEN FROM tblEnterData 
      JOIN tblDriver ON end_driAutoID = driAutoID
      JOIN tblSeller ON end_selAutoID = selAutoID
      WHERE DATE(endDatetime) = ? AND end_selAutoID = ?`
      var dataSql = [date, seller]
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