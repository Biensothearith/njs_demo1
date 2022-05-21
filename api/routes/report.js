const express = require('express');
const router = express.Router();

router.post('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    var main_id = req.body.main_id||''
    var main_type = req.body.main_type
    var main_phone = req.body.main_phone||''
    var main_numberInvoice = req.body.main_numberInvoice||''
    var type = req.body.type||"";
    if(main_type == 'receipt'){
        var sql = `
        SELECT 
            endDatetime AS date, 
            endProductType AS type, 
            endReceiverAddress AS address, 
            endStatusProductPrice as productPriceStatus, 
            endDriverFeeStatus as driverFeeStatus, 
            endDriverFeeKH as driverFeeKH, 
            endDriverFeeEN as driverFeeEN, 
            endReceiverPhone AS phNum, 
            endProductPriceKH AS priceKH, 
            endProductPriceEN AS priceEN, 
            endSenderPhone AS phNumSender, 
            endSenderFeeKH AS senderFeeKH, 
            endSenderFeeEN AS senderFeeEN, 
            endDriverStatus AS driverStatus, 
            endDriverFeeStatus AS driverFeeStatus, 
            endSenderFeeStatus AS senderFeeStatus, 
            endSenderStatus AS senderStatus, 
            braName AS branchName, 
            endMoneyGetCustomerKH AS totalGetKH, 
            endMoneyGetCustomerEN AS totalGetEN, 
            endStoreName AS shop, 
            endLocation AS location,
            endArrivedHomeFee as arrivedHomeFee,
            endInsured as insured,
            endZone as zone,
            endManyPackage as package,
            (SELECT sidRate FROM tblSiteDescription LIMIT 1) as dollarRate,
            braPrefix as prefix
            FROM tblEnterData 
            JOIN tblBranch ON braAutoID = end_braAutoID
            LEFT JOIN tblZone zone on zone.zonName=endZone
            WHERE endAutoID =?
        `;
       
        var dataSql=[main_id]
        pool.getConnection(function(err, connection) {
            if(err){
                res.status(400).json({
                    err: err,
                });
            }else{
                connection.query(sql,dataSql, function (error, results, fields) {
                    connection.release();
                    if(error){
                        res.status(400).json({
                            error: error,
                        });
                    }else{
                        if(results.length > 0){
                            res.status(200).json({
                                message: 'success',
                                data:results[0]
                            });
                        }else{
                            res.status(200).json({
                                message: 'success',
                                data:[]
                            });
                        }
                    }
                });
            }
        });
    }else if(main_type == 'driver'){

        
        var path = ""
        if(req.body.date){
            var date = JSON.parse(req.body.date)["date"] ||""
            if(date){
                path = " AND `endDateTimeOut` BETWEEN '" + date +" 00:00:00.000' AND '"+ date +" 23:59:59.999' AND endDoneStatus = 1" 
            }
        }
        var sql = "SELECT `endAutoID` AS id, endCarType AS carType, endReceiverAddress AS address, `endReceiverPhone` AS receiverPhone, `endProductType` AS productType, `endStoreName` AS storeName, endDriverFeeStatus as driverFeeStatus, endDriverFeeEN as driverFeeEN, endDriverStatus as driverStatus, endDriverFeeKH as driverFeeKH,`endDatetime` as dateTimeInput, endClearStatus AS clearStatus, `endDateTimeOut` AS dateTimeOut, "+
        "`endProductPriceEN` AS productPriceEN, `endProductPriceKH` AS productPriceKH, endStatusProductPrice as productPriceStatus, driName AS driverName, endDoneStatus as doneStatus, endSenderFeeKH as senderFeeKH, endSenderFeeEN as senderFeeEN, endSenderFeeStatus as senderFeeStatus, endSenderStatus as senderStatus, endLocation as location, endMoneyGetCustomerKH as moneyGetCustomerKH, endMoneyGetCustomerEN as moneyGetCustomerEN, endMoneyGotCustomerKH as moneyGotCustomerKH, endMoneyGotCustomerEN as moneyGotCustomerEN, endNote as note "+
        "FROM `tblEnterData` JOIN tblDriver ON driAutoID = end_driAutoID "+
        "WHERE end_driAutoID = "+main_id+ path +" ";
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
                        if(results.length > 0){
                            res.status(200).json({
                                message: 'success',
                                data:results,
                            });
                        }else{
                            res.status(200).json({
                                message: 'success',
                                data:[]
                            });
                        }
                    }
                });
            }
        });
    }else if(main_type == 'invoice'){
        
        var path = ""
        var remain = ""
        if(main_id!=='null'){
            // remain = "(SELECT COUNT(*) FROM  `tblEnterData` WHERE `endReceiveStatus` = 0 AND endReturned = 0 AND  `end_selAutoID` = '"+ main_id +"') AS remainingNumber,"
            // remain = "(SELECT COUNT(*) FROM  `tblRemain` WHERE `rmn_invAutoID` = '"+main_numberInvoice+"') AS remainingNumber, "
            path = "(SELECT `endAutoID` AS id, `end_invAutoID` AS invoiceID, `endDatetime` AS dataTime, `endReceiverPhone` AS recieverPhone, endReturned AS statusReturn, " +
            "`endReceiverAddress` AS recieverAddress, `endMoneyGotCustomerKH` AS moneyGotCustomerKH, `endMoneyGotCustomerEN` AS moneyGotCustomerEN, " +
            "`endSenderFeeKH` AS senderFeeKH, `endSenderFeeEN` AS senderFeeEN, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, " +
            "`endDriverFeeEN` AS driverFeeEN, `endDriverFeeKH` AS driverFeeKH, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, " +
            "`endNote` AS note, 1 AS remain " +
            "FROM `tblEnterData` WHERE " + 
            "`endReceiveStatus` = 0 AND endReturned = 0 AND  `end_selAutoID` = '"+ main_id +"')"
        }else{
            // remain = "(SELECT COUNT(*) FROM  `tblEnterData` WHERE `endReceiveStatus` = 0 AND endReturned = 0 AND  `end_selAutoID` = '"+ main_phone +"') AS remainingNumber,"
            // remain = "(SELECT COUNT(*) FROM  `tblRemain` WHERE `rmn_invAutoID` = '"+main_numberInvoice+"'  ) AS remainingNumber, "
            path = "(SELECT `endAutoID` AS id, `end_invAutoID` AS invoiceID, `endDatetime` AS dataTime, `endReceiverPhone` AS recieverPhone, endReturned AS statusReturn, " +
            "`endReceiverAddress` AS recieverAddress, `endMoneyGotCustomerKH` AS moneyGotCustomerKH, `endMoneyGotCustomerEN` AS moneyGotCustomerEN, " +
            "`endSenderFeeKH` AS senderFeeKH, `endSenderFeeEN` AS senderFeeEN, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, " +
            "`endDriverFeeEN` AS driverFeeEN, `endDriverFeeKH` AS driverFeeKH, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, " +
            "`endNote` AS note, 1 AS remain " +
            "FROM `tblEnterData` WHERE " + 
            "`endReceiveStatus` = 0 AND endReturned = 0 AND  `endSenderPhone` = '"+ main_phone +"')"
        }
        var sql = "SELECT `endAutoID` AS id, `endDatetime` AS dataTime, `endReceiverPhone` AS recieverPhone, endReturned AS statusReturn, " + 
        "`endReceiverAddress` AS recieverAddress, `endMoneyGotCustomerKH` AS moneyGotCustomerKH, `endMoneyGotCustomerEN` AS moneyGotCustomerEN, " + 
        "`endProductPriceEN` AS productPriceEN, `endProductPriceKH` AS productPriceKH, "+
        "`endSenderFeeKH` AS senderFeeKH, `endSenderFeeEN` AS senderFeeEN, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, " + 
        " `endDriverFeeEN` AS driverFeeEN, `endDriverFeeKH` AS driverFeeKH, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, " + 
        "`endNote` AS note, 0 AS remain, " + 
        " endDateTimeOut as dateTimeOut, end_invAutoID as invoiceID, invDateTime as invoiceDate FROM `tblEnterData` JOIN `tblInvoice` ON end_invAutoID = invAutoID  WHERE  end_invAutoID = ? AND `endReceiveStatus` = 1"
        var dataSql = [main_numberInvoice]
        
        pool.getConnection(function(err, connection) {
            if(err){
                res.status(400).json({
                    err: err,
                });
            }else{
                
                connection.query(sql,dataSql, function (error, results, fields) {
                    connection.release();
                    if(error){
                        res.status(400).json({
                            error: error,
                        });
                    }else{
                        
                        if(results.length > 0){
                            connection.query(path,function (error_,results_){
                                if(error_){
                                    res.status(400).json({
                                        error:error_
                                    })
                                }else{
                                    var idReturn = []
                                    var remain_sql = "INSERT INTO `tblRemain`(`rmn_invAutoID`, `rmn_endAutoID`) VALUES "
                                    results_.forEach(item => {
                                        remain_sql = remain_sql + "("+ main_numberInvoice +","+ item["id"]+"),"
                                    });
                                    if(type == "done"){
                                        if(results_.length > 0 ){
                                            remain_sql = remain_sql.slice(0,remain_sql.length - 1)
                                            connection.query(remain_sql,(err__,results__)=>{
                                                if(err__){
                                                    var error__ = ""
                                                    if(err__["code"] === "ER_DUP_ENTRY"){
                                                        var sql___ = "SELECT `rmnAutoID` AS id, `rmn_invAutoID` AS invoiceID, `rmn_endAutoID` AS productID, `end_invAutoID`, "+
                                                        "`endReceiverPhone` AS recieverPhone, endReturned AS statusReturn, " +
                                                        "`endReceiverAddress` AS recieverAddress, `endMoneyGotCustomerKH` AS moneyGotCustomerKH, `endMoneyGotCustomerEN` AS moneyGotCustomerEN, " +
                                                        "`endProductPriceEN` AS productPriceEN, `endProductPriceKH` AS productPriceKH, "+
                                                        "`endSenderFeeKH` AS senderFeeKH, `endSenderFeeEN` AS senderFeeEN, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, " +
                                                        "`endDriverFeeEN` AS driverFeeEN, `endDriverFeeKH` AS driverFeeKH, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, " +
                                                        "`endNote` AS note, 1 AS remain, " +
                                                        "`endDateTime` AS dataTime FROM `tblRemain` JOIN `tblEnterData` ON `rmn_endAutoID` = `endAutoID` "+
                                                        "JOIN `tblInvoice` ON `rmn_invAutoID` = invAutoID "+
                                                        "WHERE `rmn_invAutoID` = ? AND `endReceiveStatus` = 0 AND`endDoneStatus` = 0 GROUP BY `rmn_endAutoID`"
                                                        var dataSql___ = [main_numberInvoice]
                                                        connection.query( sql___, dataSql___, (err___,results___)=>{
                                                            if(err___){
                                                                res.status(400).json({
                                                                    error:err___
                                                                })
                                                            }else{
                                                                if(results___.length > 0){
                                                                    results___.map((a)=>{
                                                                        results.push(a)
                                                                    })
                                                                    res.status(200).json({
                                                                        message: 'success',
                                                                        data:results,
                                                                        results___
                                                                    });
                                                                }else{
                                                                    res.status(200).json({
                                                                        message: 'success',
                                                                        data:results,
                                                                    });
                                                                }

                                                            }
                                                        })
                                                    }else{
                                                        res.status(400).json({
                                                            error:err__
                                                        });
                                                    }
                                                    
                                                }else{
                                                    if(results__.insertId > 0){
                                                        var sql___ = "SELECT `rmnAutoID` AS id, `rmn_invAutoID` AS invoiceID, `rmn_endAutoID` AS productID, `end_invAutoID`, "+
                                                        "`endReceiverPhone` AS recieverPhone, endReturned AS statusReturn, " +
                                                        "`endReceiverAddress` AS recieverAddress, `endMoneyGotCustomerKH` AS moneyGotCustomerKH, `endMoneyGotCustomerEN` AS moneyGotCustomerEN, " +
                                                        "`endSenderFeeKH` AS senderFeeKH, `endSenderFeeEN` AS senderFeeEN, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, " +
                                                        "`endDriverFeeEN` AS driverFeeEN, `endDriverFeeKH` AS driverFeeKH, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, " +
                                                        "`endProductPriceEN` AS productPriceEN, `endProductPriceKH` AS productPriceKH, "+
                                                        "`endNote` AS note, 1 AS remain, " +
                                                        "`endDateTime` AS dataTime FROM `tblRemain` JOIN `tblEnterData` ON `rmn_endAutoID` = `endAutoID` "+
                                                        "JOIN `tblInvoice` ON `rmn_invAutoID` = invAutoID "+
                                                        "WHERE `rmn_invAutoID` = ? AND `endReceiveStatus` = 0 AND`endDoneStatus` = 0 GROUP BY `rmn_endAutoID`"
                                                        var dataSql___ = [main_numberInvoice]
                                                        connection.query( sql___, dataSql___, (err___,results___)=>{
                                                            if(err___){
                                                                res.status(400).json({
                                                                    error:err___
                                                                })
                                                            }else{
                                                                if(results___.length > 0){
                                                                    results___.map((a)=>{
                                                                        results.push(a)
                                                                    })
                                                                    res.status(200).json({
                                                                        message: 'success',
                                                                        data:results,
                                                                        results___
                                                                    });
                                                                }else{
                                                                    res.status(200).json({
                                                                        message: 'success',
                                                                        data:results,
                                                                    });
                                                                }

                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }else{
                                            res.status(200).json({
                                                message: 'success',
                                                data:results,
                                                sql
                                            });
                                        } 
                                    }else{
                                        var sql___ = "SELECT `rmnAutoID` AS id, `rmn_invAutoID` AS invoiceID, `rmn_endAutoID` AS productID, `end_invAutoID`, "+
                                        "`endReceiverPhone` AS recieverPhone, endReturned AS statusReturn, " +
                                        "`endReceiverAddress` AS recieverAddress, `endMoneyGotCustomerKH` AS moneyGotCustomerKH, `endMoneyGotCustomerEN` AS moneyGotCustomerEN, " +
                                        "`endProductPriceEN` AS productPriceEN, `endProductPriceKH` AS productPriceKH, "+
                                        "`endSenderFeeKH` AS senderFeeKH, `endSenderFeeEN` AS senderFeeEN, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, " +
                                        "`endDriverFeeEN` AS driverFeeEN, `endDriverFeeKH` AS driverFeeKH, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, " +
                                        "`endNote` AS note, 1 AS remain, `endReceiveStatus` AS receiverStatus, `endDoneStatus` AS doneStatus, " +
                                        "`endDateTime` AS dataTime FROM `tblRemain` JOIN `tblEnterData` ON `rmn_endAutoID` = `endAutoID` "+
                                        "JOIN `tblInvoice` ON `rmn_invAutoID` = invAutoID "+
                                        "WHERE `rmn_invAutoID` = ? AND `endReceiveStatus` = 0 AND`endDoneStatus` = 0 GROUP BY `rmn_endAutoID`"
                                        var dataSql___ = [main_numberInvoice]
                                        connection.query( sql___, dataSql___, (err___,results___)=>{
                                            if(err___){
                                                res.status(400).json({
                                                    error:err___
                                                })
                                            }else{
                                                if(results___.length > 0){
                                                    results___.map((a)=>{
                                                        results.push(a)
                                                    })
                                                    res.status(200).json({
                                                        message: 'success',
                                                        data:results,
                                                        results___
                                                    });
                                                }else{
                                                    res.status(200).json({
                                                        message: 'success',
                                                        data:results,
                                                        results___,
                                                        dataSql___,
                                                        sql___
                                                    });
                                                }

                                            }
                                        })
                                    }
                                }
                            })
                            
                        }else{
                            res.status(200).json({
                                message: 'success',
                                data:results,
                                sql,
                                dataSql
                            });
                        }
                    }
                });
            }
        });
    }
});

module.exports = router;