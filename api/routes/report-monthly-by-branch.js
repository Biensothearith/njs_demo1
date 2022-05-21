const express = require('express');
const Router = express.Router();

Router.get('/view/:month/:type', (req, res) => {
      var user = req.userDataFromToken;
      var month = req.params.month;
      var type = req.params.type || 0;
      var sql = "";

      if (user['headStatus']) {
            if (type === '0') {
                  sql = `SELECT 
                              endAutoID AS id,
                              endPercentageOutput AS percentageOutput, 
                              endPercentageInput AS percentageInput,
                              endDriverFeeKH AS driverFee, 
                              braName AS nameBranch, 
                              braAutoID AS branchId,
                              braBranchName AS branchName, 
                              braLocation AS branchLocation, 
                              endDoneReport AS doneReport, 
                              rpb_braAutoID AS reportBranchId, 
                              endDateTimeOut AS dateTimeOut, 
                              endBraIdInput AS branchIdInput, 
                              endBraIdOutput AS branchIdOutput,
                              endBranchIdParentInput AS branchIdParentInput,
                              endBranchIdParentOutput AS branchIdParentOutput,
                              endParentPercentInput as ParentPercentInput,
                              endParentPercentOutput as ParentPercentOutput,
                              endInsured as insured,
                              endArrivedHomeFee as arrivedHomeFee,
                              endProductPriceEN as price,
                              braParentID as parentId
                        FROM tblEnterData 
                        LEFT JOIN tblBranch 
                              ON braAutoID = endBraIdInput 
                              OR braAutoID = endBraIdOutput 
                              OR braAutoID=endBranchIdParentInput 
                              OR braAutoID=endBranchIdParentOutput 
                        LEFT JOIN tblReportBranch 
                              ON braAutoID = rpb_braAutoID 
                        WHERE MONTH(endDateTimeOut) = MONTH(?) 
                              AND YEAR(endDateTimeOut) = YEAR(?) 
                              AND (endBraIdInput 
                                    IN (SELECT braAutoID FROM tblBranch WHERE braHeadStatus = 0) 
                                    OR endBraIdOutput IN (SELECT braAutoID FROM tblBranch WHERE braHeadStatus = 0) 
                                    OR endBranchIdParentInput IN (SELECT braAutoID FROM tblBranch WHERE braHeadStatus = 0)
                                    OR endBranchIdParentOutput IN (SELECT braAutoID FROM tblBranch WHERE braHeadStatus = 0)
                                    ) 
                              
                     `
            }else{
                  sql = `SELECT 
                              endAutoID AS id,
                              endParentPerson AS branchPersonParent,
                              endPercentageOutput AS percentageOutput, 
                              endPercentageInput AS percentageInput,
                              endDriverFeeKH AS driverFee, 
                              braName AS nameBranch, 
                              braAutoID AS branchId, 
                              braBranchName AS branchName, 
                              braLocation AS branchLocation, 
                              endDoneReport AS doneReport, 
                              endDateTimeOut AS dateTimeOut,
                              endBraIdInput AS branchIdInput, 
                              endBraIdOutput AS branchIdOutput,
                              endBranchIdParentInput AS branchIdParentInput,
                              endBranchIdParentOutput AS branchIdParentOutput,
                              endParentPercentInput as ParentPercentInput,
                              endInsured as insured,
                              endArrivedHomeFee as arrivedHomeFee,
                              endProductPriceEN as price,
                              endParentPercentOutput as ParentPercentOutput
                        FROM tblEnterData 
                              LEFT JOIN tblBranch 
                              ON braAutoID = endBraIdInput 
                              OR braAutoID = endBraIdOutput 
                        WHERE MONTH(endDateTimeOut) = MONTH(?) 
                              AND YEAR(endDateTimeOut) = YEAR(?) 
                              AND (
                                    endBraIdInput IN (SELECT braAutoID FROM tblBranch WHERE braHeadStatus = 0) 
                                    OR endBraIdOutput IN (SELECT braAutoID FROM tblBranch WHERE braHeadStatus = 0) 
                                    OR endBranchIdParentOutput IN (SELECT braAutoID FROM tblBranch WHERE braHeadStatus = 0)
                                    OR endBranchIdParentInput IN (SELECT braAutoID FROM tblBranch WHERE braHeadStatus = 0)
                              ) 
                              AND braAutoID IN (SELECT rpb_braAutoID FROM tblReportBranch)`
            }
      }
      var sqlData = [month, month]

      pool.getConnection((error, connection) => {

            if (error) {
                  res.status(400).json({
                        error
                  });
            } else {
                  connection.query(sql, sqlData, (err, results) => {
                        connection.release();
                        if (err) {
                              res.status(400).json({
                                    error: err
                              });
                        } else {
                              if (results.length > 0) {
                                    res.status(200).json({
                                          message: 'success',
                                          data: results,
                                          sqlData
                                    });
                              } else {
                                    res.status(200).json({
                                          message: 'success',
                                          data: []
                                    });
                              }
                        }
                  });
            }
      });
});

module.exports = Router;