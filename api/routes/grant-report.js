const express = require('express');
const router = express.Router();
const moment = require('moment');

router.post('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    var statusSql = '';
    var daily = req.body.daily || ''
    var head = req.body.head || false
    var date = req.body.date || ''
    var from = req.body.from || ''
    var to = req.body.to || ''
    var seller = req.body.seller || false
    var driver = req.body.driver || false
    var location = req.body.location || ''
    var status = req.body.status ? req.body.status:req.body.status === 0 ? req.body.status: false
    var zone = req.body.zone || false
    var carType = req.body.carType || ''
    var branch = req.body.branch || false
    var productType = req.body.productType || ''
    var receiverPhone = req.body.receiverPhone || ''
    var id = req.body.id || ''
    var doneReport = req.body.doneReport ? req.body.doneReport:req.body.doneReport === 0 ? req.body.doneReport: false
    var from_ = req.body.from_ || ''
    var to_ = req.body.to_ || ''
    var monthly = req.body.monthly ? req.body.monthly:""
    var monthly_ = req.body.monthly_ ? req.body.monthly_:""
    var exportExcell = req.body.exportExcell
    var page = req.body.currentPage ? req.body.currentPage:0
    var offset = (page - 1) * row_count_data
    var limit = ""
    var search = req.body.search
    var dateLimit = moment(new Date).format("YYYY-MM")+"-01 00:00:000"
    if(exportExcell){
        limit = ""
        // statusSql+="WHERE `endDateTimeOut` BETWEEN '2021-03-10 00:00:000' AND '2021-03-10 23:59:0.000' "
        // statusSql+="WHERE `endDateTimeOut` >= DATE_ADD('"+dateLimit+"', INTERVAL  -1 MONTH) "
        statusSql+="WHERE `endDatetime` >= DATE_ADD(NOW(), INTERVAL -2 MONTH)  "
    }
    if(page > 0){
        limit = "LIMIT "+offset+","+row_count_data
    }else{
        limit = ""
    }
    
    if(monthly !== ""){
        if(statusSql == ""){
            statusSql += "WHERE MONTH(`endDatetime`) = MONTH('"+ monthly + "') AND YEAR(`endDatetime`) = YEAR('"+monthly+"') "
        }else{
            statusSql += "AND MONTH(`endDatetime`) = MONTH('"+ monthly + "') AND YEAR(`endDatetime`) = YEAR('"+monthly+"') "
        }
    }

    if(monthly_ !== ""){
        if(statusSql == ""){
            statusSql += "WHERE MONTH(`endDateTimeOut`) = MONTH('"+ monthly_ + "') AND YEAR(`endDateTimeOut`) = YEAR('"+monthly_+"') "
        }else{
            statusSql += "AND MONTH(`endDateTimeOut`) = MONTH('"+ monthly_ + "') AND YEAR(`endDateTimeOut`) = YEAR('"+monthly_+"') "
        }
    }

    if(from !== "" && to !== ""){
        statusSql = "WHERE endDatetime BETWEEN '"+from+" 00:00:00.000' AND '"+to+" 23:59:59.999' "
    }

    if(from_ !== "" && to_ !== ""){
        statusSql = "WHERE endDateTimeOut BETWEEN '"+from_+" 00:00:00.000' AND '"+to_+" 23:59:59.999' "
    }

    if(date !== ''){
        if(statusSql == ''){
            statusSql += "WHERE endDateTimeOut BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999' "
        }else{
            statusSql += "AND endDateTimeOut IS NOT NULL AND endDateTimeOut BETWEEN '"+date+" 00:00:00.000' AND '"+date+" 23:59:59.999' "
        }
    }
    if(doneReport !== false){
        if(statusSql == ''){
            statusSql += "WHERE endDoneReport = '"+doneReport+"' ";
        }else{
            statusSql += "AND endDoneReport = '"+doneReport+"' ";
        }
    }
    if(daily !== ''){
        if(statusSql == ''){
            statusSql += "WHERE endDateTimeOut IS NOT NULL "
        }else{
            statusSql += "AND endDateTimeOut IS NOT NULL "
        }
    }
    if(seller !== false){
        if(statusSql == ''){
            statusSql += "WHERE end_selAutoID = "+seller+" ";
        }else{
            statusSql += "AND end_selAutoID = "+seller+" ";
        }
    }
    if(driver !== false){
        if(statusSql == ''){
            statusSql += "WHERE end_driAutoID = "+driver+" ";
        }else{
            statusSql += "AND end_driAutoID = "+driver+" ";
        }
    }
    if(location != ''){
        if(statusSql == ''){
            statusSql += "WHERE endLocation = '"+location+"' ";
        }else{
            statusSql += "AND endLocation = '"+location+"' ";
        }
    }
    if(status !== false){
        if(statusSql == ''){
            if(status == 1 || status == 0){
                statusSql += "WHERE endReceiveStatus = "+status+" ";
            }
            else if(status == 2){
                statusSql += "WHERE endClearStatus = 1 ";
            }else if(status == 3){
                statusSql += "WHERE endReturned = 1 ";
            }else if(status == 4){
                statusSql += "WHERE endClearStatus = 0 AND endReturned = 0 AND endReceiveStatus = 1 "
            }else if(status == 5){
                statusSql += "WHERE endReturned = 0 AND endReceiveStatus = 0 "
            }
        }else{
            if(status == 1 || status == 0){
                statusSql += 
                // "AND endReceiveStatus = "+status+
                " AND usa_braAutoID = "+userData.braAutoID+" ";
            }
            else if(status == 2){
                statusSql += "AND endClearStatus = 1 AND usa_braAutoID = "+userData.braAutoID+" ";
            }else if(status == 3){
                statusSql += "AND endReturned = 1 AND usa_braAutoID = "+userData.braAutoID+" ";
            }else if(status == 4){
                statusSql += "AND endClearStatus = 0 AND endReturned = 0 AND endReceiveStatus = 1 AND usa_braAutoID = "+userData.braAutoID+" "
            }else if(status == 5){
                statusSql += "AND endReturned = 0 AND endReceiveStatus = 0 "
            }
        }
    }
    if(zone !== false){
        if(statusSql == ''){
            statusSql += "WHERE endZone = '"+zone+"' ";
        }else{
            statusSql += "AND endZone = '"+zone+"' ";
        }
    }
    if(carType != ''){
        if(statusSql == ''){
            statusSql += "WHERE endCarType = '"+carType+"' ";
        }else{
            statusSql += "AND endCarType = '"+carType+"' ";
        }
    }
    if(branch !== false){
        if(statusSql == ''){
            statusSql += "WHERE end_braAutoID = "+branch+" ";
        }else{
            statusSql += "AND end_braAutoID = "+branch+" ";
        }
    }
    if(productType != ''){
        if(statusSql == ''){
            statusSql += "WHERE endProductType = '"+productType+"' ";
        }else{
            statusSql += "AND endProductType = '"+productType+"' ";
        }
    }
    if(receiverPhone != ''){
        if(statusSql == ''){
            statusSql += "WHERE endReceiverPhone = '"+receiverPhone+"' ";
        }else{
            statusSql += "AND endReceiverPhone = '"+receiverPhone+"' ";
        }
    }
    if(id != ''){
        var find = 'SMTC';
        var re = new RegExp(find, 'g');
        var str = id ? id.replace(re,"") : '';
        if(str !== ''){
            if(statusSql === ''){
                statusSql += "WHERE endAutoID = '"+str+"' ";
            }else{
                statusSql += "AND endAutoID = '"+str+"' ";
            }
        }
    }
    if(search){
        if(statusSql === ''){
            statusSql += "WHERE (`endDatetime` LIKE '%"+search+"%') OR "+
            "(`endStoreName` LIKE '%"+search+"%') OR (`endSenderPhone` LIKE '%"+search+"%') OR (`endReceiverAddress` LIKE '%"+search+"%') OR "+
            "(`endZone` LIKE '%"+search+"%') OR (`endReceiverPhone` LIKE '%"+search+"%') OR (`endProductType` LIKE '%"+search+"%') "
        }else{
            statusSql += "AND (`endDatetime` LIKE '%"+search+"%') OR "+
            "(`endStoreName` LIKE '%"+search+"%') OR (`endSenderPhone` LIKE '%"+search+"%') OR (`endReceiverAddress` LIKE '%"+search+"%') OR "+
            "(`endZone` LIKE '%"+search+"%') OR (`endReceiverPhone` LIKE '%"+search+"%') OR (`endProductType` LIKE '%"+search+"%') "
        }
    }
    if(statusSql == ''){
        statusSql += (userData.usaType != 1 && head === false ? "WHERE end_braAutoID = "+userData.braAutoID+" ":"");
    }else{
        statusSql += (userData.usaType != 1 && head === false ? "AND end_braAutoID = "+userData.braAutoID+" ":"");
    }
    var userData = req.userDataFromToken;
    var sql = "SELECT `endAutoID` AS id, end_selAutoID AS seller_id, end_braAutoID as branch_id, `endDatetime` as dateTime, `endStoreName` as storeName, "+
    "`endPhone` as phone, `endSenderPhone` as senderPhone, endCarType as carType, end_usaAutoID as userID, "+
    "`endReceiverPhone` as receiverPhone, `endLocation` as location, `endReceiverAddress` "+
    "as receiverAddress, `endProductType` as productType, endReturned as returned, endReceiveStatus as receiverStatus, "+
    "`endProductPriceKH` as productPriceKH, `endProductPriceEN` as productPriceEN, "+
    "(SELECT COUNT(*) FROM `tblEnterData` "+statusSql+") AS dataCount, "+
    "`endMoneyGetCustomerKH` as moneyGetCustomerKH, `endMoneyGetCustomerEN` as moneyGetCustomerEN, "+
    "`endMoneyGotCustomerKH` as moneyGotCustomerKH, `endMoneyGotCustomerEN` as moneyGotCustomerEN, "+
    "`endDriverFeeEN` as driverFeeEN, `endDriverFeeKH` as driverFeeKH, `endSenderFeeKH` as senderFeeKH, `endSenderFeeEN` as senderFeeEN, " +
    "`endNote` as note, end_driAutoID as driverID, endClearStatus clearStatus, endReturnedNote as returnedNote, endReturnedDate as returnedDate, "+
    "`endBraIdInput` as branchInput, endBraIdOutput as branchOutput, endDateTimeOut as dateOutput, "+
    "`endDateTimeClear` AS dateClear, "+
    "`endPercentageInput` AS percentageInput,`endPercentageOutput` AS percentageOutput, "+
    "braName as branchName "+
    "FROM `tblEnterData` "+
    "JOIN tblBranch ON braAutoID = end_braAutoID JOIN tblUserAdmin ON usa_braAutoID = braAutoID "+
    statusSql+" GROUP BY endDatetime ORDER BY endDatetime DESC "+limit;
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
                        body:req.body
                    });
                }else{
                    if(results.length > 0){
                        res.status(200).json({
                            message: 'success',
                            data:results,
                            sql
                        });
                    }else{
                        res.status(200).json({
                            message: 'success',
                            data:[],
                            sql
                        });
                    }
                }
            });
        }
    });
});

router.post('/update', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id || '';
    var note = req.body.note || '';
    var date = moment(new Date()).format("YYYY-MM-DD");
    var sql = "UPDATE `tblEnterData` SET endReturnedNote = ?, endReturnedDate = ?, endReturned = 1 WHERE endAutoID = ?";
    var dataSql = [
        note, date, id
    ]
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
                    if(results.affectedRows > 0){
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'err_update',
                        });
                    }
                }
            });
        }
    });
});

router.post('/update/report', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id || '';
    var branchId = req.body.branchId
    if(id !== ''){
        var sql = "UPDATE `tblEnterData` SET endDoneReport = 1 "+
        "WHERE endAutoID IN (?)";
        var dataSql = [id]
        pool.getConnection(function(err, connection) {
            if(err){
                res.status(400).json({
                    err: err,
                });
            }else{
                connection.query(sql, dataSql, function (error, results, fields) {
                    
                    if(error){
                        connection.release();
                        res.status(400).json({
                            error: error,
                        });
                    }else{
                        if(results.affectedRows > 0){
                            var sql_ = "INSERT INTO `tblReportBranch`(`rpb_braAutoID`) VALUES (?)"
                            var sqlData_ = [branchId]
                            connection.query(sql_, sqlData_, (err_, results_)=>{
                                connection.release();
                                if(err_){
                                    res.status(400).json({
                                        error:err_
                                    });
                                }else{
                                    if(results_.insertId > 0){
                                        res.status(200).json({
                                            message:"success"
                                        });
                                    }else{
                                        res.status(400).json({
                                            error: 'err_update',
                                        });
                                    }
                                }
                            });
                        }else{
                            connection.release();
                            res.status(400).json({
                                message: 'err_update',
                            });
                        }
                    }
                });
            }
        });
    }else{
        res.status(400).json({
            message: 'invalid_id',
        });
    }
});

module.exports = router;