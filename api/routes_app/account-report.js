const express = require("express")
const router = express.Router()

//1 all => "" 
//2 success =>  "WHERE endDoneStatus = 1"
//3 return => "endReturned = 1" 
//4 delay => "endNoteDelivery IS NOT NULL AND end_driAutoID IS NOT NULL AND endDoneStatus = 0 endPrintStatus = 0" 

router.get("/list/:page/:type",(req, res, next)=>{
      var user = req.userDataFromToken
      var page = req.params.page
      var offset = (page - 1) * row_count ;
      var type = req.params.type
      var sql = ''
      if(type == 'called'){
            sql = `
                  SELECT driAutoID as driverID, driName AS driverName, DATE(endDatetime) as dateTime 
                  FROM tblEnterData JOIN tblDriver ON end_driAutoID = driAutoID
                  WHERE end_selAutoID = ? 
                  GROUP BY driAutoID, DATE(endDatetime)
                  ORDER BY endDatetime DESC LIMIT ${offset}, ${row_count}

            `
      }else if(type == 'total'){
            sql = `
                  SELECT driAutoID as driverID, driName AS driverName, endDatetime as dateTime 
                  FROM tblEnterData JOIN tblDriver ON end_driAutoID = driAutoID
                  WHERE end_selAutoID = ? AND endClearStatus = 1
                  GROUP BY DATE(endDatetime), driAutoID
                  ORDER BY endDatetime DESC LIMIT ${offset}, ${row_count}
            `
      }
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

router.get("/detail/:type/:date/:driver",(req, res, next)=>{
      var user = req.userDataFromToken
      var type = req.params.type
      var date = req.params.date
      var driver = req.params.driver || ''
      var sql = ''
      if(type == 'called'){
            sql = `
                  SELECT 
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
                  endAutoID as id, end_driAutoID AS driverID, endDriverFeeKH as driverFeeKH, endDriverFeeEN as driverFeeEN,
                  endDatetime AS dateTime, endDateTimeOut AS dateTimeOut, endStoreName AS storeName,
                  endSenderPhone AS senderPhone, endReceiverPhone AS receiverPhone, endLocation AS location,
                  endZone AS zone, endReceiverAddress AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,
                  endProductType AS productType,driName AS driverName, driPhone AS driverPhone, selAddress as sellerAddress,
                  endNote AS note, endProductPriceEN as productEN FROM tblEnterData 
                  JOIN tblDriver ON end_driAutoID = driAutoID
                  JOIN tblSeller ON end_selAutoID = selAutoID
                  WHERE end_selAutoID = ? AND DATE(endDatetime) = ? AND end_driAutoID = ?
                  ORDER BY endDatetime DESC
            `
      }else if(type == 'total'){
            sql = `
                  SELECT endDatetime as dateTime, driName as driverName, count(*) as countPackages, 
                  SUM(endDriverFeeKH) as driverFeeKH, SUM(endDriverFeeEN) as driverFeeEN,
                  SUM(endMoneyGetCustomerKH) AS totalGetKH, SUM(endMoneyGetCustomerEN) AS totalGetEN
                  FROM tblEnterData JOIN tblDriver ON end_driAutoID = driAutoID
                  WHERE end_selAutoID = ? AND DATE(endDatetime) = ? AND end_driAutoID = ? AND endClearStatus = 1
                  GROUP BY DATE(endDatetime), driAutoID
            `
      }
      var dataSql = [user.ID, date, parseInt(driver)]
      console.log('dataSql', sql, dataSql);
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