const express = require('express');
const router = express.Router();

router.get("/",(req, res, next)=>{
      var userData = req.userDataFromToken
      var data = req.query.data;
      var search = JSON.parse(data).search
      var sql = "SELECT COUNT(*) AS total FROM `tblEnterData` WHERE end_braAutoID = "+userData.braAutoID+" "
      if(search){
        if(sql === ''){
            sql += "WHERE (`endAutoID` LIKE '%"+search+"%') OR (`endDatetime` LIKE '%"+search+"%') OR "+
            "(`endStoreName` LIKE '%"+search+"%') OR (`endSenderPhone` LIKE '%"+search+"%') OR (`endReceiverAddress` LIKE '%"+search+"%') OR "+
            "(`endZone` LIKE '%"+search+"%') OR (`endReceiverPhone` LIKE '%"+search+"%') OR (`endProductType` LIKE '%"+search+"%') "
        }else{
            sql += "AND (`endAutoID` LIKE '%"+search+"%') OR (`endDatetime` LIKE '%"+search+"%') OR "+
            "(`endStoreName` LIKE '%"+search+"%') OR (`endSenderPhone` LIKE '%"+search+"%') OR (`endReceiverAddress` LIKE '%"+search+"%') OR "+
            "(`endZone` LIKE '%"+search+"%') OR (`endReceiverPhone` LIKE '%"+search+"%') OR (`endProductType` LIKE '%"+search+"%') "
        }
    }
      pool.getConnection(function(error, connection) {
          if(error){
              res.status(400).json({
                  error:error
              })
          }else{
              connection.query(sql, function(err, results) {
                  connection.release();
                  if(err){
                      res.status(400).json({
                          error:err
                      })
                  }else{
                      res.status(200).json({
                          data:results[0]["total"]
                      })
                  }
              })
          }
      })
})
module.exports = router