const express = require('express');
const Router = express.Router();

Router.get("/view/:month",(req, res)=>{
      var userData = req.userDataFromToken
      var month = req.params.month
      var statusSql = ""
      if(!userData['headStatus']){
            statusSql = "AND (`endBraIdInput` = "+userData['braAutoID']+" OR `endBraIdOutput` = "+userData['braAutoID']+" OR `endBranchIdParentOutput` = "+userData['braAutoID']+" OR `endParentPercentInput` = "+userData['braAutoID']+")"
      }
      var sql = "SELECT `endPercentageOutput` AS percentageOutput, `endPercentageInput` AS percentageInput, endInsured as insured,endArrivedHomeFee as arrivedHomeFee,endProductPriceEN as price,"+
      "`endDriverFeeKH` AS driverFee, endBranchIdParentInput as branchIdParentInput,endBranchIdParentOutput as branchIdParentOutput,endParentPercentInput as ParentPercentInput,endParentPercentOutput as ParentPercentOutput,"+
      "`endDateTimeOut` AS dateTimeOut, `endBraIdInput` AS branchIdInput, `endBraIdOutput` AS branchIdOutput "+
      "FROM `tblEnterData` "+
      "WHERE MONTH(`endDateTimeOut`) = MONTH(?) AND YEAR(`endDateTimeOut`) = YEAR(?) " + statusSql
      
      var sqlData = [month, month, userData['braAutoID'], userData['braAutoID']]
      pool.getConnection((error, connection)=>{
            if(error){
                  res.status(400).json({
                        error
                  });
            }else{
                  connection.query(sql, sqlData, (err, results)=>{
                        connection.release();
                        if(err){
                              res.status(400).json({
                                    error:err
                              });
                        }else{
                              if(results.length > 0){
                                    res.status(200).json({
                                          message:"success",
                                          data: results,
                                          userData
                                    });
                              }else{
                                    res.status(200).json({
                                          message:"success",
                                          data: [],
                                          sql
                                    });
                              }
                        }
                  });
            }
      });
});


module.exports = Router