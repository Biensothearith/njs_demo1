const express = require("express")
const Router = express.Router();

Router.get('/view',(req, res, next)=>{
      var data = req.query.data
      var date = JSON.parse(data).date
      if(date == 'false'){
            var sql = "SELECT COUNT(*) as requesting FROM `tblRequireBooking` WHERE rbo_driAutoID IS NULL"
      }else{
            var sql = "SELECT `rboAutoID` AS id, `rbo_selAutoID` AS sellerId, "+
            "`rbo_driAutoID` AS driverId, `rboDatetime` AS dateTime, "+
            "`rboAmount` AS amount, `rboLocation` AS location, rboDriverType AS driverType, "+
            " `selName` AS sellerName, `selPhone` AS sellerPhone, `selAddress` AS sellerAddress "+
            "FROM `tblRequireBooking` JOIN `tblSeller` ON `rbo_selAutoID` =  `selAutoID` WHERE `rboStatus` = 0 "+
            "AND `rboDatetime` BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999' ORDER BY rboDatetime DESC"
      }
      pool.getConnection((error, connection)=>{
            if(error){
                  res.status(400).json({
                        error
                  })
            }else{
                  connection.query(sql, (err, results)=>{
                        connection.release()
                        if(err){
                              res.status(400).json({
                                    error:err
                              })
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
                  });
            }
      })
});

Router.post('/update',(req, res, next)=>{
      var id = req.body.id
      var driverID = req.body.driverID
      var sql = `
            UPDATE tblRequireBooking SET rbo_driAutoID= ? WHERE rboAutoID = ?
      `
      var dataSql = [driverID, id]
      pool.getConnection((error, connection)=>{
            if(error){
                  res.status(400).json({
                        error
                  })
            }else{
                  connection.query(sql, dataSql, (err, results)=>{
                        connection.release()
                        if(err){
                              res.status(400).json({
                                    error:err
                              })
                        }else{
                              if(results.affectedRows){
                                    sendNotification('driver', driverID, {
                                          title: 'You have new request booking',
                                          message:`Administrator asign you a new booking`,
                                          typeMessange:'warning',
                                          data: {
                                                nav:'BOOKING'
                                          }
                                    });
                                    res.status(200).json({
                                          message:"success",
                                    })
                              }else{
                                    res.status(400).json({
                                          message:"error_update",
                                    })
                              }
                        }
                  });
            }
      })
});

module.exports = Router