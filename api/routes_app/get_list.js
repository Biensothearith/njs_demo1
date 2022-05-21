const express = require("express")
const router = express.Router()
const moment = require('moment')
router.get("/:date",(req, res, next)=>{
      var user = req.userDataFromToken;
      var date = req.params.date
      var from = date +" 00:00:000"
      var to = date +" 23:59:59.999"
      var sql = ""
      var sqlData = []
      var startDate= new Date ;
      var endDate=new Date;
      startDate=moment(startDate).format('yyyy-MM-DD');
      endDate=moment(endDate).format('yyyy-MM-DD');
      const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD');
      const endOfMonth   = moment().clone().endOf('month').format('YYYY-MM-DD');
      var _Between= `endDateTimeDrive >'${startDate} 00:00:00.000' AND  endDateTimeDrive<'${endDate} 23:59:59.999'`      
      var _Between_Seller=`endDatetime BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999'`

      if(user["typeAccount"] == "driver"){
            //[ទំនិញដឹកបានជោគជ័យសរុប,ទំនិញកំពុងដឹក,ទំនិញដឹកបានជោគជ័យ]
            sqlData = [user["ID"],from,to]
            sql = "SELECT `end_driAutoID` AS id, "+
            "(SELECT COUNT(*) FROM `tblEnterData` "+
            "WHERE `end_driAutoID` = '"+user["ID"]+"' AND `endReturned` = 0 AND `endDoneStatus` = 1 AND MONTH('"+date+"') = MONTH(`endDateTimeDrive`))"+
            "AS totalNumberTransit, "+
            "(SELECT COUNT(*) FROM `tblEnterData` "+
            "WHERE `endReceiveStatus` = 0 AND `endDownStatus`=0 AND `end_driAutoID` ='"+user["ID"]+"')"+
            "AS numberTransiting,"+
            "(SELECT COUNT(*) FROM `tblEnterData` "+
            "WHERE `endDoneStatus` = 1 AND `endReturned` = 0 AND `end_driAutoID` = '"+user["ID"]+"' AND `endDateTimeDrive` BETWEEN '"+from+"' AND '"+to+"') "+
            "AS numberTransited, "+
            "(SELECT COUNT(*) FROM `tblEnterData` "+
            "WHERE  `end_driAutoID` = '"+user["ID"]+"' AND `endDateTimeDrive` BETWEEN '"+from+"' AND '"+to+"') AS numberReturned "+
            "FROM `tblEnterData` WHERE `end_driAutoID` = ?"
      }else{
            sql = 
            `SELECT end_selAutoID AS id,
                  (SELECT COUNT(*) FROM tblEnterData
                        WHERE end_selAutoID = ${user["ID"]} AND endDownStatus=0 AND endReceiveStatus=0 AND end_driAutoID IS NULL)
                  AS "totalNumberTransit",
                  (SELECT COUNT(*) FROM tblEnterData
                        WHERE end_selAutoID = ${user["ID"]} AND endDownStatus=0 AND endReceiveStatus=0 AND end_driAutoID IS NULL AND ${_Between_Seller})
                  AS "numberTransit",
                  (SELECT COUNT(*) FROM tblEnterData
                        WHERE endDownStatus = 0 AND endReceiveStatus = 0 AND end_driAutoID IS NOT NULL AND end_selAutoID = ${user["ID"]})
                  AS numberTransiting,
                  (SELECT COUNT(*) FROM tblEnterData
                        WHERE endDownStatus = 0 AND endReceiveStatus = 1 AND end_selAutoID = ${user["ID"]}  AND endDateTimeDrive BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999')
                  AS numberTransited,
                  (SELECT COUNT(*) FROM tblEnterData
                        WHERE endDownStatus = 1 AND endReceiveStatus = 0 AND end_selAutoID = ${user["ID"]} AND ${_Between}) 
                  AS numberReturned
            FROM tblEnterData WHERE end_selAutoID = ${user["ID"]} GROUP BY end_selAutoID`
      }
      pool.getConnection(function(err, connection){
            if(err){
                  res.status(400).json({
                        error:err
                  })
            }else{
                  connection.query(sql, sqlData, function(error, results,){
                        connection.release();
                        if(error){
                              console.log(error)
                              res.status(400).json({
                                    error:error
                              });
                        }else{
                              if(results.length > 0){
                                    delete results[0].id
                                    res.status(200).json({
                                          message:"success",
                                          results:results[0]
                                    });
                              }else{
                                    res.status(400).json({
                                          message:"invalid"
                                    })
                              }
                              
                        }
                  });
            }
      })
})

router.get('/view/padding-clear', (req, res, next) => {
      var userData = req.userDataFromToken;
      var sql=""
      var startDate= new Date ;
      var endDate=new Date;
      startDate=moment(startDate).format('yyyy-MM-DD');
      endDate=moment(endDate).format('yyyy-MM-DD');
    //   endDatetime BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' AND
      if(userData["typeAccount"]==='driver'){
          sql=`SELECT * FROM tblEnterData WHERE end_driAutoID=${userData["ID"]}`
      }else{
          sql=`SELECT 
              endMoneyGotCustomerKH as kh,
              endMoneyGotCustomerEN as en,
              endSenderFeeEN as senderFeeEN,
              endSenderFeeKH as senderFeeKH,
              endDriverFeeEN as driverFeeEN,
              endDriverFeeKH as driverFeeKH,
              endDriverFeeStatus as driverFeeStatus,
              endDriverStatus as 	driverStatus,
              endSenderFeeStatus as SenderFeeStatus,
              endSenderStatus as SenderStatus
              FROM tblEnterData WHERE 
              endDoneStatus=1 AND 
              endClearStatus=0 AND
              end_selAutoID=${userData["ID"]}`
      }
      pool.getConnection(function(err, connection){
          if(err){
                res.status(400).json({
                      error:err
                })
          }else{
                  console.log('========sql,',sql)
                connection.query(sql, function(error, results,){
                      connection.release();
                      if(error){
                            res.status(400).json({
                                  error:error
                            });
                      }else{
                            if(results.length > 0){
                                  res.status(200).json({
                                        message:"success",
                                        results:results
                                  });
                            }else{
                                  res.status(400).json({
                                        message:"invalid"
                                  })
                            }
                            
                      }
                });
          }
    })
});
module.exports = router;
