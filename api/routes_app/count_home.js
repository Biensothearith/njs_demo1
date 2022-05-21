const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment')
router.get('/',(req, res, next)=>{
      var user = req.userDataFromToken;
      var startDate= new Date ;
      var endDate=new Date;
      startDate=moment(startDate).format('yyyy-MM-DD');
      endDate=moment(endDate).format('yyyy-MM-DD')
      var _Between= `end_DriverActiveDate >'${startDate} 00:00:00.000' AND  end_DriverActiveDate<'${endDate} 23:59:59.999'`      
      var _Between_Seller=`endDatetime BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999'`
      var sql = ""
      if(user["typeAccount"] == "driver"){
            var sql = `
                  SELECT count(*) AS doneSta,
                        (                                         
                        SELECT count(*) FROM tblEnterData WHERE endReceiveStatus = 0 AND endDownStatus=0 AND end_driAutoID =${user["ID"]}
                  ) AS  drivingSta,
                  (
                        SELECT count(*) FROM tblEnterData WHERE endReceiveStatus = 0 AND endDownStatus = 1 AND ${_Between} AND end_driAutoID =${user["ID"]}
                  ) AS backSta 
                        FROM tblEnterData WHERE endReceiveStatus = 1 AND endDownStatus = 0 AND ${_Between} AND end_driAutoID = ${user["ID"]}
            `;
      }else{
            var sql = `
            SELECT count(*) AS doneSta,
                  (                                         
                  SELECT count(*) FROM tblEnterData WHERE endReceiveStatus = 0 AND endDownStatus = 0 AND end_selAutoID =${user["ID"]}
            ) AS  drivingSta,
            (
                  SELECT count(*) FROM tblEnterData WHERE endDownStatus = 1 AND endReceiveStatus = 0 AND ${_Between_Seller} AND end_selAutoID =${user["ID"]}
            ) AS backSta 
                  FROM tblEnterData WHERE endReceiveStatus = 1 AND endDownStatus = 0 AND endDateTimeDrive BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' AND end_selAutoID = ${user["ID"]}
            `;
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
                              res.status(200).json({
                                    message:"success",
                                    results
                              })  
                        }
                  })
            }
      })
});
router.get('/detail/:id',(req, res, next)=>{
      var user = req.userDataFromToken
      var id = req.params.id
      var sql = "SELECT `endAutoID` AS id,`end_driAutoID` AS driverID, `end_selAutoID` AS sellerID, "+
      "`endDatetime` AS dateTime, `endDateTimeOut` AS dateTimeOut, `endStoreName` AS storeName, "+
      "`endSenderPhone` AS senderPhone, `endReceiverPhone` AS receiverPhone, `endLocation` AS location, `endZone` AS zone, `endReceiverAddress` AS receiverAddress, "+
      "`endProductType` AS productType, `driName` AS driverName, `driPhone` AS driverPhone "+
      "FROM `tblEnterData` JOIN `tblDriver` ON `end_driAutoID` = `driAutoID` WHERE `endAutoID` = ? AND `driAutoID` = ?"
      var dataSql = [id,user["ID"]]
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
                              res.status(200).json({
                                    message:"success",
                                    results
                              })  
                        }
                  })
            }
      })
});

module.exports = router;