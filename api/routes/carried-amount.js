const express = require("express")
const Router = express.Router()

Router.get("/view",(req, res, next)=>{
      var data = req.query.data
      var date = JSON.parse(data).date
      var sql = "SELECT `driAutoID` AS driverId, `driName` AS driverName, "+
      "`driType` AS driverType, `endDatetime` AS dateTime, "+
      "(SELECT COUNT(*) FROM  `tblEnterData` WHERE `end_driAutoID` = `driAutoID` AND `endDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999') AS amount, "+
      "`driPhone` AS driverPhone FROM `tblDriver` JOIN `tblEnterData` ON `driAutoID` = `end_driAutoID` WHERE "+
      "`endDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999' "+
      "GROUP BY `driAutoID`"
      pool.getConnection((error, connection)=>{
            if(error){
                  res.status(400).json({
                        error
                  })
            }else{
                  connection.query( sql, (err, results)=>{
                        connection.release()
                        if(err){
                              res.status(400).json({
                                    error:err
                              });
                        }else{
                              if(results.length > 0){
                                    res.status(200).json({
                                          message:"success",
                                          data:results
                                    });
                              }else{
                                    res.status(200).json({
                                          message:"success",
                                          data:[]
                                    });
                              };
                        };
                  });
            };
      });
});

Router.get("/view/carried-shop",(req, res, next)=>{
      var data = req.query.data
      var driverId = JSON.parse(data).driverId
      var date = JSON.parse(data).date
      var sql = "SELECT `selAutoID` AS sellerId, `selName` AS sellerName,"+
      "`selPhone` AS sellerPhone, `selAddress` AS sellerAddress, `endDatetime` AS dateTime, "+
      "(SELECT COUNT(*) FROM `tblEnterData` WHERE `end_selAutoID` = `selAutoID` AND `end_driAutoID` = "+driverId+" AND `endDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999') AS amount "+
      "FROM `tblSeller` JOIN `tblEnterData` ON `selAutoID` = `end_selAutoID` WHERE `end_driAutoID` = "+driverId+" AND "+
      "`endDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999' GROUP BY `selAutoID`"
      pool.getConnection((error, connection)=>{
            if(error){
                  res.status(400).json({
                        error
                  });
            }else{
                  connection.query(sql, (err, results)=>{
                        connection.release()
                        if(err){
                              res.status(400).json({
                                    error:err
                              });
                        }else{
                              if(results.length > 0){
                                    res.status(200).json({
                                          message:"success",
                                          data:results
                                    });
                              }else{
                                    res.status(200).json({
                                          message:"success",
                                          data:[]
                                    });
                              };
                        };
                  });
            };
      });
});

Router.get('/view/carried-product',(req, res, next)=>{
      var data = req.query.data
      var date = JSON.parse(data).date
      var driverId = JSON.parse(data).driverId
      var sellerId = JSON.parse(data).sellerId
      var status = JSON.parse(data).status
      var sql = ""
      if(!status){
            sql = "SELECT `endAutoID` AS id, `endReceiverAddress` AS receiverAddress, "+
            "IF(endReturned = 1, 3, IF(endDoneStatus = 1, 2, IF(endDelayDate IS NOT NULL, 4,"+
            "IF(end_driAutoID IS NOT NULL, 1, 0)))) as status,"+
            "`endProductPriceKH` AS productPriceKH,`endProductPriceEN` AS productPriceEN, "+
            "`endDriverFeeEN` AS driverFeeEN,`endDriverFeeKH` AS driverFeeKH, "+
            "`endDatetime` AS dateTime, "+
            "`endStoreName` AS sellerName, `endSenderPhone` AS senderPhone, `endProductType` AS productType, "+
            "`endReceiverPhone` AS receiverPhone, `driName` AS driverName, `driPhone` AS driverPhone " +
            "FROM  `tblEnterData` JOIN  `tblDriver` ON `end_driAutoID` = `driAutoID` WHERE `end_driAutoID` = "+driverId+" AND "+
            "`end_selAutoID` = "+sellerId+" AND "+
            "`endDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999'"
      }else if(status === 1){
            sql = "SELECT `endAutoID` AS id, `endReceiverAddress` AS receiverAddress, "+
            "IF(endReturned = 1, 3, IF(endDoneStatus = 1, 2, IF(endDelayDate IS NOT NULL, 4,"+
            "IF(end_driAutoID IS NOT NULL, 1, 0)))) as status,"+
            "`endProductPriceKH` AS productPriceKH,`endProductPriceEN` AS productPriceEN, "+
            "`endDriverFeeEN` AS driverFeeEN,`endDriverFeeKH` AS driverFeeKH, "+
            "`endDatetime` AS dateTime, "+
            "`endStoreName` AS sellerName, `endSenderPhone` AS senderPhone, `endProductType` AS productType, "+
            "`endReceiverPhone` AS receiverPhone, `driName` AS driverName, `driPhone` AS driverPhone " +
            "FROM  `tblEnterData` JOIN  `tblDriver` ON `end_driAutoID` = `driAutoID` WHERE `end_driAutoID` = "+driverId+" AND "+
            "`end_selAutoID` = "+sellerId+" AND "+
            "`endDoneStatus` = 1 AND `endReturned` = 0 AND "+
            "`endDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999'"
      }else if(status === 2){
            sql = "SELECT `endAutoID` AS id, `endReceiverAddress` AS receiverAddress, "+
            "IF(endReturned = 1, 3, IF(endDoneStatus = 1, 2, IF(endDelayDate IS NOT NULL, 4,"+
            "IF(end_driAutoID IS NOT NULL, 1, 0)))) as status,"+
            "`endProductPriceKH` AS productPriceKH,`endProductPriceEN` AS productPriceEN, "+
            "`endDriverFeeEN` AS driverFeeEN,`endDriverFeeKH` AS driverFeeKH, "+
            "`endDatetime` AS dateTime, "+
            "`endStoreName` AS sellerName, `endSenderPhone` AS senderPhone, `endProductType` AS productType, "+
            "`endReceiverPhone` AS receiverPhone, `driName` AS driverName, `driPhone` AS driverPhone " +
            "FROM  `tblEnterData` JOIN  `tblDriver` ON `end_driAutoID` = `driAutoID` WHERE `end_driAutoID` = "+driverId+" AND "+
            "`end_selAutoID` = "+sellerId+" AND "+
            "`endReturned` = 1 AND "+
            "`endDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999'"
      }else if(status === 3){
            sql = "SELECT `endAutoID` AS id, `endReceiverAddress` AS receiverAddress, "+
            "IF(endReturned = 1, 3, IF(endDoneStatus = 1, 2, IF(endDelayDate IS NOT NULL, 4,"+
            "IF(end_driAutoID IS NOT NULL, 1, 0)))) as status,"+
            "`endProductPriceKH` AS productPriceKH,`endProductPriceEN` AS productPriceEN, "+
            "`endDriverFeeEN` AS driverFeeEN,`endDriverFeeKH` AS driverFeeKH, "+
            "`endDatetime` AS dateTime, "+
            "`endStoreName` AS sellerName, `endSenderPhone` AS senderPhone, `endProductType` AS productType, "+
            "`endReceiverPhone` AS receiverPhone, `driName` AS driverName, `driPhone` AS driverPhone " +
            "FROM  `tblEnterData` JOIN `tblDriver` ON `end_driAutoID` = `driAutoID` WHERE `end_driAutoID` = "+driverId+" AND "+
            "`end_selAutoID` = "+sellerId+" AND "+
            "`endDelayDate` IS NOT NULL AND `endReturned` = 0 AND "+
            "`endDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999'"
      }
      pool.getConnection((error, connection)=>{
            if(error){
                  res.status(400).json({
                        error
                  });
            }else{
                  connection.query(sql, (err, results)=>{
                        connection.release()
                        if(err){
                              res.status(400).json({
                                    error:err
                              });
                        }else{
                              if(results.length > 0){
                                    res.status(200).json({
                                          message:"success",
                                          data:results,
                                          sql
                                    });
                              }else{
                                    res.status(200).json({
                                          message:"success",
                                          data:[],
                                          sql
                                    })
                              }
                        };
                  });
            };
      });
});

module.exports = Router;