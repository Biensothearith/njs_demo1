const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment')

router.post('/',(req, res, next)=>{
      var user = req.userDataFromToken;
      var sql = ""
      var page = req.body.page;
      var status = req.body.status;
      var offset = (page - 1) * row_count ;
      var path = "";
      var pathSaller="";
      var startDate= new Date ;
      var endDate=new Date;
      startDate=moment(startDate).format('yyyy-MM-DD');
      endDate=moment(endDate).format('yyyy-MM-DD')
      var _Between= `end_DriverActiveDate >'${startDate} 00:00:00.000' AND  end_DriverActiveDate<'${endDate} 23:59:59.999'`      
      var _Between_Seller=`endDateTimeDrive BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999'`
      if(status == 1){
            path  = "`endDownStatus` = 0 AND `endReceiveStatus` = 0";
            pathSaller="`endReceiveStatus` = 0 AND endDownStatus = 0"
      }else if(status == 2){
            path  = `endReceiveStatus = 1 AND endDownStatus = 0 AND ${_Between}` 
            pathSaller=`endDownStatus = 0 AND endReceiveStatus = 1 AND ${_Between_Seller}`
      }else{
            path = `endDownStatus = 1 AND endReceiveStatus= 0 AND ${_Between} `
            pathSaller=`endDownStatus = 1 AND endReceiveStatus = 0 AND ${_Between_Seller}`
      }
      if(user["typeAccount"] == "driver"){
            sql = "SELECT `endAutoID` AS id,end_DriverActiveDate as activeDate, `end_driAutoID` AS driverID,`endDatetime` AS dateTime,`endStoreName` AS storeName, "+
            "`endSenderPhone` AS senderPhone, `endReceiverPhone` AS receiverPhone, `endLocation` AS location, `endZone` AS zone, "+
            "`endReceiverAddress` AS receiverAddress, `endProductType` AS productType, `endDoneStatus` AS doneStatus, `endClearStatus` AS clearStatus "+
            "FROM `tblEnterData` WHERE `end_driAutoID` = '"+user["ID"]+"' AND "+ path +
            " GROUP BY `endAutoID` " +
            "ORDER BY `end_DriverActiveDate` DESC LIMIT "+offset+", "+row_count+"";
      }else{
            sql = "SELECT `endAutoID` AS id,endDateTimeDrive as activeDate, `end_driAutoID` AS driverID,`endDatetime` AS dateTime,`endStoreName` AS storeName, "+
            "`endSenderPhone` AS senderPhone, `endReceiverPhone` AS receiverPhone, `endLocation` AS location, `endZone` AS zone, "+
            "`endReceiverAddress` AS receiverAddress, `endProductType` AS productType, `endDoneStatus` AS doneStatus, `endClearStatus` AS clearStatus "+
            "FROM `tblEnterData` WHERE `end_selAutoID` = '"+user["ID"]+"' AND "+ pathSaller +
            " GROUP BY `endAutoID` " +
            "ORDER BY `endDateTimeDrive` DESC LIMIT "+offset+", "+row_count+"";
      }

      pool.getConnection(function(err, connection) {
            if(err){
                  res.status(400).json({
                      err: err,
                  });
              }else{
                  console.log('====',sql)
                  connection.query(sql, function (error, results, fields) {
                        connection.release();
                        if(error){
                              res.status(400).json({
                                  error: error,
                              });
                        }else{
                              res.status(200).json({
                                    message:"success",
                                    results,
                                    hi:user["typeAccount"]
                              })  
                        }
                  })
            }
      })
});
router.get('/detail/:id',(req, res, next)=>{
      var user = req.userDataFromToken
      var id = req.params.id
      var type=user.typeAccount
      var sql=""
      if(type=="seller"){
            sql = `
            SELECT endAutoID AS id,
            end_driAutoID AS driverID,
            end_selAutoID AS sellerID,
            endDatetime AS dateTime,
            endDateTimeOut AS dateTimeOut, 
            endStoreName AS storeName,
            endNote AS noteReturnProduct,
            endSenderPhone AS senderPhone,
            endReceiverPhone AS receiverPhone,
            endLocation AS location, 
            endZone AS zone, 
            endReceiverAddress AS receiverAddress,
            endProductType AS productType,
            driName AS driverName,
            driPhone AS driverPhone,
            endMoneyGetCustomerKH AS totalGetKH,
            endMoneyGetCustomerEN AS totalGetEN
            FROM tblEnterData 
            JOIN tblSeller ON selAutoID = end_selAutoID
            LEFT JOIN tblDriver ON driAutoID = end_driAutoID
            WHERE endAutoID = ? AND selAutoID = ?`
      }else{
            sql = `
            SELECT 
            end_selAutoID AS seller_ID,
            endAutoID AS id,
            end_driAutoID AS driverID,
            endDatetime AS dateTime,
            endDateTimeOut AS dateTimeOut, 
            endStoreName AS storeName,
            endNote AS noteReturnProduct,
            endSenderPhone AS senderPhone,
            endReceiverPhone AS receiverPhone,
            endLocation AS location, 
            endZone AS zone, 
            endReceiverAddress AS receiverAddress,
            endProductType AS productType,
            driName AS driverName,
            driPhone AS driverPhone,
            endMoneyGetCustomerKH AS totalGetKH,
            endMoneyGetCustomerEN AS totalGetEN
            FROM tblEnterData JOIN tblDriver ON end_driAutoID = driAutoID 
            WHERE endAutoID = ? AND driAutoID = ?`
      }
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
                                    results,
                                    id :req.params.id,
                                    type:user.typeAccount
                              })  
                        }
                  })
            }
      })
});

module.exports = router;