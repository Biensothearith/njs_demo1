const express = require('express');
const router = express.Router();
const moment = require("moment")


function checkBranchHaveParent(id,callback){
    if(id){
        var sql=`SELECT braParentID as parentId FROM tblBranch WHERE braAutoID=?`;
        var dataSql=[id]
        pool.getConnection(function(err, connection) {
            if(err){
                return callback({code:400,data:[],error:err});
            }else{
                connection.query(sql,dataSql, (error, results)=>{
                    connection.release();
                    if(error){
                        return callback({code:400,data:[],error:error});
                    }else{
                        if(results.length>0){
                            return callback({code:200,data:results[0]});
                        }else{
                            return callback({code:200,data:[]});
                        }
                    }
                })
            }
        });
    }else{
        return callback({code:400,data:[],error:"no user id"});
    }
}


router.get('/view/:status/', (req, res, next) => {
    var userData = req.userDataFromToken;
    var status = req.params.status;
    var data = req.query.data;
    var driver = JSON.parse(data).driver;
    var seller = JSON.parse(data).seller;
    var statusDriver = JSON.parse(data).statusDriver
    var doneStatus = JSON.parse(data).doneStatus
    var clearStatus = JSON.parse(data).clearStatus
    var action = JSON.parse(data).action
    var search = JSON.parse(data).search
    var date = JSON.parse(data).date
    var statusSql = ''
    var page = JSON.parse(data).page;
    var offset = (page - 1) * row_count_data ;
    var limit = ""

    if(action){
        filter_data(req,data,function(results){
            if(results.status == 200){
                res.status(200).json({
                    message:results.message,
                    data:results.data,
                    action:action,
                    sql:results.sql
                })
            }else{
                res.status(400).json({
                    message:results.message
                })
            }
        })
    }else{

        if(status !== "false"){
            statusSql = " WHERE endClearStatus = "+ status+" "
        }

        if(driver != ''){

            if(statusSql == ''){

                statusSql += driver === null? "WHERE end_driAutoID IS NULL AND endReturned = 0 AND endDoneStatus = 0 ": "WHERE end_driAutoID IS NOT NULL AND endDoneStatus = 0 ";
            }else{
                statusSql +=driver === null? "AND end_driAutoID IS NULL endReturned = 0 AND endDoneStatus = 0 " : "AND end_driAutoID IS NOT NULL AND endDoneStatus = 0 ";
            }
        }
        if(seller != ''){
            if(statusSql == ''){
                statusSql += "WHERE end_selAutoID = "+seller+" ";
            }else{
                statusSql += "AND end_selAutoID = "+seller+" ";
            }
        }

        if(statusDriver === 1){
            if(statusSql == ''){
                statusSql += "WHERE end_driAutoID IS NOT NULL AND endDoneStatus = 0 " 
            }else{
                statusSql += "AND end_driAutoID IS NOT NULL AND endDoneStatus = 0 " 
            }
        }
        if(statusDriver === 2){
            if(statusSql == ''){
                statusSql += "WHERE end_driAutoID IS NOT NULL AND endDoneStatus = 1 AND MONTH(`endDateTimeOut`) = MONTH('"+ date + "') AND YEAR(`endDateTimeOut`) = YEAR('"+date+"') " 
            }else{
                statusSql += "AND end_driAutoID IS NOT NULL AND endDoneStatus = 1 AND MONTH(`endDateTimeOut`) = MONTH('"+ date + "') AND YEAR(`endDateTimeOut`) = YEAR('"+date+"') " 
            }
        }
        if(doneStatus){
            if(clearStatus == 'false'){
                if(statusSql == ''){
                    statusSql += "WHERE endDoneStatus = "+doneStatus+ " AND endClearStatus = " + 0 + " "
                }else{
                    statusSql += "AND endDoneStatus = "+doneStatus+ " AND endClearStatus = " + 0 + " "
                }
            }
        }
        if(statusSql == ''){
            statusSql += (userData.usaType != 1 ? "WHERE end_braAutoID = "+userData.braAutoID+" ":" ");
        }else{
            statusSql += (userData.usaType != 1 ? "AND end_braAutoID = "+userData.braAutoID+" ":" ");
        }
        if(search){
            if(statusSql === ''){
                statusSql += "WHERE (`endAutoID` LIKE '%"+search+"%') OR (`endDatetime` LIKE '%"+search+"%') OR "+
                "(`endStoreName` LIKE '%"+search+"%') OR (`endSenderPhone` LIKE '%"+search+"%') OR (`endReceiverAddress` LIKE '%"+search+"%') OR "+
                "(`endZone` LIKE '%"+search+"%') OR (`endReceiverPhone` LIKE '%"+search+"%') OR (`endProductType` LIKE '%"+search+"%') "
            }else{
                statusSql += "AND (`endAutoID` LIKE '%"+search+"%') OR (`endDatetime` LIKE '%"+search+"%') OR "+
                "(`endStoreName` LIKE '%"+search+"%') OR (`endSenderPhone` LIKE '%"+search+"%') OR (`endReceiverAddress` LIKE '%"+search+"%') OR "+
                "(`endZone` LIKE '%"+search+"%') OR (`endReceiverPhone` LIKE '%"+search+"%') OR (`endProductType` LIKE '%"+search+"%') "
            }
        }
        if(page){
            limit = "LIMIT " + offset + "," + row_count_data
        }

        var userData = req.userDataFromToken;
        var sql = "SELECT `endAutoID` AS id, endInsured as insured,endArrivedHomeFee as arrivedHomeFee,endManyPackage as manyPackage, end_selAutoID AS seller_id, `endDatetime` as dateTime, endDateTimeOut as dateTimeOut, `endStoreName` as storeName, "+
        "`endSenderPhone` as senderPhone, end_usaAutoID as userID, "+
        "`endReceiverPhone` as receiverPhone, `endLocation` as location, end_invAutoID as invoiceID, `endReceiverAddress` "+
        "as receiverAddress, `endProductType` as productType, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, "+
        "`endProductPriceKH` as productPriceKH, `endProductPriceEN` as productPriceEN, `endCarType` as carType, `endZone` as zone, `endNoteDelivery` as noteDelivery, "+
        "`endMoneyGetCustomerKH` as moneyGetCustomerKH, `endMoneyGetCustomerEN` as moneyGetCustomerEN, "+
        "`endMoneyGotCustomerKH` as moneyGotCustomerKH, `endMoneyGotCustomerEN` as moneyGotCustomerEN, "+
        "`endSenderFeeEN` as senderFeeEN, `endSenderFeeKH` as senderFeeKH, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, "+
        "`endDriverFeeEN` as driverFeeEN, `endDriverFeeKH` as driverFeeKH , endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, "+
        "`endNote` as note, `endStatusProductPrice` as productPriceStatus, end_driAutoID as driverID, endReceiveStatus as receiveStatus, "+
        "endSenderFeeStatus as senderFeeStatus, endClearStatus as clearStatus, endDoneStatus as doneStatus, endReturned as returned "+
        "FROM `tblEnterData` "+statusSql+" ORDER BY endAutoID DESC " + limit;
        console.log('-----',sql)
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
                                date: date,
                                statusSql:statusSql,
                                userData:userData
                            });
                        }else{
                            res.status(200).json({
                                message: 'success',
                                data:[],
                                statusSql:statusSql,
                                driver: driver
                            });
                        }
                    }
                });
            }
        });
    }
});

router.post('/insert', (req, res, next) => {
    var userData = req.userDataFromToken;
    var driverName = req.body.driverName || '',

    arrivedHomeFee=req.body.arrivedHomeFee || 0,
    insured=req.body.insured || 0,

    storeName = req.body.storeName || '',
    senderPhone = req.body.senderPhone || '',
    receiverAddress = req.body.receiverAddress || '',
    zone = req.body.zone||'',
    receiverPhone = req.body.receiverPhone || '',
    note = req.body.note||"",

    productType = req.body.productType || '',
    productPriceKH = req.body.productPriceKH || 0,
    productPriceEN = req.body.productPriceEN || 0,
    productPriceStatus = req.body.productPriceStatus || 0,
    
    driverFeeKH = req.body.driverFeeKH || 0,
    driverFeeEN = req.body.driverFeeEN || 0,
    driverFeeStatus = req.body.driverFeeStatus || 0,
    driverStatus = req.body.driverStatus || 0,
    
    type = req.body.type || 0;
    seller_id = req.body.seller_id,
    seller_id = seller_id?seller_id:null,

    moneyGetCustomerKH = req.body.moneyGetCustomerKH || 0,
    moneyGetCustomerEN = req.body.moneyGetCustomerEN || 0,

    senderFeeKH = req.body.senderFeeKH || 0,
    senderFeeEN = req.body.senderFeeEN || 0,
    senderFeeStatus = req.body.senderFeeStatus || 0,
    senderStatus = req.body.senderStatus || 0,
    carType = req.body.carType||'',
    percentageInput = req.body.percentageInput || 0,

    endManyPackage=req.body.manyPackage || 1;


    var sql=``;
    var dataSql=[];
    checkBranchHaveParent(userData.braAutoID,function(rs){
        if(rs.code===200){
            if(rs['data']['parentId']){
                sql = `INSERT INTO tblEnterData(
                        endArrivedHomeFee,endInsured,
                        endStoreName, endSenderPhone, endReceiverAddress, endZone, endReceiverPhone,
                        endNote, endProductType, endProductPriceKH, endProductPriceEN, endStatusProductPrice,
                        endDriverFeeEN, endDriverFeeKH, endDriverFeeStatus, endDriverStatus, endLocation,
                        end_selAutoID, end_braAutoID, endMoneyGetCustomerKH, endMoneyGetCustomerEN, endSenderFeeEN,
                         endSenderFeeKH,endSenderFeeStatus, endSenderStatus, endCarType, endBraIdInput, 
                         end_usaAutoID, endPercentageInput,endBranchIdParentInput,endParentPercentInput,endManyPackage ) 
                    VALUES ( ?,?,
                             ?, ?, ?, ?, ?,
                             ?, ?, ?, ?, ?, 
                             ?, ?, ?, ?, ?,
                             ?, ?, ?, ?, ?,
                             ?, ?, ?, ?, ?,
                             ?, ( SELECT  braPercentageInput FROM tblBranch WHERE braAutoID=? ), ?, ?,?)`;
                dataSql = [
                    arrivedHomeFee,insured,

                    storeName, 
                    senderPhone, 
                    receiverAddress,
                    zone,
                    receiverPhone,
                    note,  
                    
                    productType, 
                    productPriceKH, 
                    productPriceEN,
                    productPriceStatus,

                    driverFeeEN,
                    driverFeeKH,
                    driverFeeStatus,
                    driverStatus,

                    type,
                    seller_id,
                    userData.braAutoID,
                    moneyGetCustomerKH,
                    moneyGetCustomerEN,
                    
                    senderFeeEN,
                    senderFeeKH,
                    senderFeeStatus,
                    senderStatus,
                    carType,
                    userData.braAutoID,
                    userData.usaAutoID,
                    userData.braAutoID,
                    rs['data']['parentId'],
                    5.00,
                    endManyPackage
                ]
            }else{
                sql = "INSERT INTO `tblEnterData`(`endArrivedHomeFee`,`endInsured`,`endStoreName`, `endSenderPhone`, `endReceiverAddress`, `endZone`, `endReceiverPhone`, `endNote`, `endProductType`, `endProductPriceKH`, `endProductPriceEN`, `endStatusProductPrice`, `endDriverFeeEN`, `endDriverFeeKH`, `endDriverFeeStatus`, `endDriverStatus`, endLocation, end_selAutoID, end_braAutoID, `endMoneyGetCustomerKH`, `endMoneyGetCustomerEN`, `endSenderFeeEN`, `endSenderFeeKH`,`endSenderFeeStatus`, `endSenderStatus`, `endCarType`, endBraIdInput, end_usaAutoID, `endPercentageInput`,`endManyPackage`) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
                dataSql = [
                    arrivedHomeFee,
                    insured,

                    storeName, 
                    senderPhone, 
                    receiverAddress,
                    zone,
                    receiverPhone,
                    note,  
                    
                    productType, 
                    productPriceKH, 
                    productPriceEN,
                    productPriceStatus,

                    driverFeeEN,
                    driverFeeKH,
                    driverFeeStatus,
                    driverStatus,

                    type,
                    seller_id,
                    userData.braAutoID,
                    moneyGetCustomerKH,
                    moneyGetCustomerEN,
                    
                    senderFeeEN,
                    senderFeeKH,
                    senderFeeStatus,
                    senderStatus,
                    carType,
                    userData.braAutoID,
                    userData.usaAutoID,
                    percentageInput,
                    endManyPackage
                ]
            }
        }else{
            sql = "INSERT INTO `tblEnterData`(`endArrivedHomeFee`,`endInsured`,`endStoreName`, `endSenderPhone`, `endReceiverAddress`, `endZone`, `endReceiverPhone`, `endNote`, `endProductType`, `endProductPriceKH`, `endProductPriceEN`, `endStatusProductPrice`, `endDriverFeeEN`, `endDriverFeeKH`, `endDriverFeeStatus`, `endDriverStatus`, endLocation, end_selAutoID, end_braAutoID, `endMoneyGetCustomerKH`, `endMoneyGetCustomerEN`, `endSenderFeeEN`, `endSenderFeeKH`,`endSenderFeeStatus`, `endSenderStatus`, `endCarType`, endBraIdInput, end_usaAutoID, `endPercentageInput`,`endManyPackage` ) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            dataSql = [
                arrivedHomeFee,
                insured,

                storeName, 
                senderPhone, 
                receiverAddress,
                zone,
                receiverPhone,
                note,  
                
                productType, 
                productPriceKH, 
                productPriceEN,
                productPriceStatus,

                driverFeeEN,
                driverFeeKH,
                driverFeeStatus,
                driverStatus,

                type,
                seller_id,
                userData.braAutoID,
                moneyGetCustomerKH,
                moneyGetCustomerEN,
                
                senderFeeEN,
                senderFeeKH,
                senderFeeStatus,
                senderStatus,
                carType,
                userData.braAutoID,
                userData.usaAutoID,
                percentageInput,
                endManyPackage
            ]
        }
        pool.getConnection(function(err, connection) {
            if(userData.braAutoID){
                if(err){
                    console.log(err)
                    res.status(400).json({
                        err: err,
                    });
                }else{
                    connection.query(sql, dataSql, function (error, results, fields) {
                        connection.release();
                        if(error){
                            console.log(error)
                            res.status(400).json({
                                error: error,
                            });
                        }else{
                            if(results.insertId){
                                res.status(200).json({
                                    message: 'success',
                                    data: results.insertId
                                });
                            }else{
                                res.status(400).json({
                                    message: 'err_insert',
                                });
                            }
                        }
                    });
                }
            }else{
                res.status(400).json({
                    message: 'err_braID',
                });
            }
        });
     }
    )
    
});

router.post('/update', (req, res, next) => {
    console.log('----rith',req.body)
    var userData = req.userDataFromToken;
    var id = req.body.id || '';
    var driverName = req.body.driverName || '',

    manyPackage=req.body.manyPackage || 1,
    insured=req.body.insured || 0,
    arrivedHomeFee=req.body.arrivedHomeFee || 0,

    storeName = req.body.storeName || '',
    senderPhone = req.body.senderPhone || '',
    receiverAddress = req.body.receiverAddress || '',
    zone = req.body.zone||'',
    receiverPhone = req.body.receiverPhone || '',
    note = req.body.note||"",

    productType = req.body.productType || '',
    productPriceKH = req.body.productPriceKH || 0,
    productPriceEN = req.body.productPriceEN || 0,
    productPriceStatus = req.body.productPriceStatus || 0,
    
    driverFeeKH = req.body.driverFeeKH || 0,
    driverFeeEN = req.body.driverFeeEN || 0,
    driverFeeStatus = req.body.driverFeeStatus || 0,
    driverStatus = req.body.driverStatus || 0,
    
    type = req.body.type || 0;
    seller_id = req.body.seller_id,
    seller_id = seller_id?seller_id:null,

    moneyGetCustomerKH = req.body.moneyGetCustomerKH || 0,
    moneyGetCustomerEN = req.body.moneyGetCustomerEN || 0,

    senderFeeKH = req.body.senderFeeKH || 0,
    senderFeeEN = req.body.senderFeeEN || 0,
    senderFeeStatus = req.body.senderFeeStatus || 0,
    senderStatus = req.body.senderStatus || 0,
    carType = req.body.carType||''

    var sql = "UPDATE `tblEnterData` SET `endManyPackage`=?, `endInsured`=?,`endArrivedHomeFee`=?,`endStoreName` = ?, `endSenderPhone` = ?, `endReceiverAddress` = ?, `endZone` = ?, `endReceiverPhone` = ?, `endNote` = ?, `endProductType` = ?, `endProductPriceKH` = ?, endProductPriceEN = ?,  `endStatusProductPrice` = ?, `endDriverFeeEN` = ?, `endDriverFeeKH` = ?, `endDriverFeeStatus` = ?, `endDriverStatus` = ?, endLocation = ?, end_selAutoID = ?, `endMoneyGetCustomerKH` = ?, `endMoneyGetCustomerEN` = ?, `endSenderFeeEN` = ?, `endSenderFeeKH` = ?,`endSenderFeeStatus` = ?, `endSenderStatus` = ?, `endCarType` = ?   WHERE endAutoID = ?";
    var dataSql = [
        manyPackage,
        insured,
        arrivedHomeFee,

        storeName, 
        senderPhone, 
        receiverAddress,
        zone,
        receiverPhone,
        note,  
        
        productType, 
        productPriceKH, 
        productPriceEN,
        productPriceStatus,

        driverFeeEN,
        driverFeeKH,
        driverFeeStatus,
        driverStatus,

        type,
        seller_id,
        moneyGetCustomerKH,
        moneyGetCustomerEN,

        senderFeeEN,
        senderFeeKH,
        senderFeeStatus,
        senderStatus,
        carType,
        id
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

router.post('/update/driver', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id || '';
    driverID = req.body.driverID || null;
    var dateDriver = new Date
    var sql = "UPDATE tblEnterData SET end_driAutoID = ?, `endDateTimeDrive` = ? "+
    "WHERE endAutoID = ?";
    var dataSql = [driverID, dateDriver, id]
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

router.post('/update/data', (req, res, next) => {
    var moneyGotCustomerEN = req.body.moneyGotCustomerEN || 0
    var moneyGotCustomerKH = req.body.moneyGotCustomerKH || 0
    var senderFeeEN = req.body.senderFeeEN || 0
    var senderFeeKH = req.body.senderFeeKH || 0
    var receiveStatus = req.body.receiveStatus || 0
    var senderStatus = req.body.senderStatus || 0
    senderStatus = senderStatus ? 1 : 0
    receiveStatus = receiveStatus?1:0
    var driverID = req.body.driverID||null
    
    var note = req.body.note||""
    var id = req.body.id
    var sql = "UPDATE `tblEnterData` SET `endMoneyGotCustomerKH`= ?, `endMoneyGotCustomerEN`= ?, `endSenderFeeEN`= ?, `endSenderFeeKH`= ?, `endReceiveStatus`= ?, `endNote`= ?, endSenderStatus = ?, `end_driAutoID` = ? WHERE `endAutoID`= ?"
    var dataSql = [
        JSON.parse(moneyGotCustomerKH),
        JSON.parse(moneyGotCustomerEN),
        JSON.parse(senderFeeEN),
        JSON.parse(senderFeeKH),
        receiveStatus,
        note,
        senderStatus,
        driverID,
        id
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

router.post('/update/data/invoice', (req, res, next) => {

    var moneyGotCustomerEN = req.body.moneyGotCustomerEN || 0
    var moneyGotCustomerKH = req.body.moneyGotCustomerKH || 0
    var senderFeeEN = req.body.senderFeeEN||0
    var senderFeeKH = req.body.senderFeeKH||0
    var driverFeeEN = req.body.driverFeeEN||0
    var driverFeeKH = req.body.driverFeeKH||0
    var id = req.body.id

    var sql = "UPDATE `tblEnterData` SET `endDriverFeeEN` = ?, `endDriverFeeKH` = ?, `endSenderFeeEN` = ?, `endSenderFeeKH`= ?, endMoneyGotCustomerEN = ?, endMoneyGotCustomerKH = ?  WHERE `endAutoID`= ?"
    var dataSql = [driverFeeEN,driverFeeKH,senderFeeEN,senderFeeKH,moneyGotCustomerEN,moneyGotCustomerKH,id]
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
                            message: 'err_update_invoice',
                        });
                    }
                }
            });
        }
    });
    
});

router.post('/update/done', (req, res, next) => {
    var userData = req.userDataFromToken;
    var driverID = null
    var status = 1
    var receiveStatus = req.body.receiveStatus 
    var id = req.body.id
    var percentageOutput = req.body.percentageOutput
    var date = new Date
    var sql = ''
    var dataSql = []
        checkBranchHaveParent(userData.braAutoID,function(rs){
            if(receiveStatus === 1 ){
                if(rs.code===200){
                    if(rs['data']['parentId']){
                        sql = "UPDATE `tblEnterData` SET endDoneStatus = ?, endBraIdOutput = ?, endDateTimeOut = ?, `endPercentageOutput` = ?,`endBranchIdParentOutput`=?,`endParentPercentOutput`= ?  WHERE `endAutoID`= ?"
                        dataSql = [status,userData.braAutoID,date, percentageOutput,rs['data']['parentId'],5.00,id]
                    }else{
                        sql = "UPDATE `tblEnterData` SET endDoneStatus = ?, endBraIdOutput = ?, endDateTimeOut = ?, `endPercentageOutput` = ?  WHERE `endAutoID`= ?"
                        dataSql = [status,userData.braAutoID,date, percentageOutput,id]
                    }
                }else{
                    sql = "UPDATE `tblEnterData` SET endDoneStatus = ?, endBraIdOutput = ?, endDateTimeOut = ?, `endPercentageOutput` = ?  WHERE `endAutoID`= ?"
                    dataSql = [status,userData.braAutoID,date, percentageOutput,id]
                }
            }else{
                sql = "UPDATE `tblEnterData` SET end_driAutoID = ?  WHERE `endAutoID`= ?"
                dataSql = [driverID,id];
            }
            pool.getConnection(function(err, connection) {
                if(err){
                    res.status(400).json({
                        err: err,
                    });
                }else{
                    connection.query(sql, dataSql, function (error, results, fields) {
                        connection.release();
                        if(error){
                            console.log('ឲឲឲឲ',error)
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
                                    message: 'err_done',
                                });
                            }
                        }
                    });
                }
            });
        });
});

router.post('/update/clear', (req, res, next) => {
    var seller_id = req.body.seller_id
    var status = 1
    var id = req.body.id
    var dateClear = moment(new Date()).format("YYYY-MM-DD");
    var sql = "INSERT INTO `tblInvoice`(`inv_selAutoID`) VALUES (?)"
    var dataSql = [seller_id]
    
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
                    if(results.insertId){
                        const invoiceID = results.insertId
                        var sql_ = "UPDATE `tblEnterData` SET endClearStatus = ?, end_invAutoID = ?, `endDateTimeClear` = ?  WHERE `endAutoID` IN (?)"
                        var dataSql_ = [status,results.insertId,dateClear,id]
                        pool.getConnection(function(err,connection){
                            if(err){
                                res.status(400).json({
                                    err:err
                                });
                            }else{
                                connection.query(sql_,dataSql_, function (error,results){
                                    connection.release();
                                    if(error){
                                        res.status(400).json({
                                            error:error
                                        });
                                    }else{
                                        if(results.affectedRows > 0){
                                            res.status(200).json({
                                                message: 'success',
                                                results:invoiceID
                                            });
                                        }else{
                                            res.status(400).json({
                                                message: 'err_clear',
                                            });
                                        }
                                    }
                                })
                            }
                        })
                    }else{
                        res.status(400).json({
                            message: 'err_clear',
                        });
                    }
                }
            });
        }
    });
    
});

router.post('/update/zone', (req, res, next) => {
    var zone = req.body.zone
    var id = req.body.id
    
    var sql = "UPDATE `tblEnterData` SET endZone = ?  WHERE `endAutoID`  = ?"
    var dataSql = [zone,id]
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
                            message: 'err_update_zone',
                        });
                    }
                }
            });
        }
    });
    
});
router.post('/update/receiverAddress', (req, res, next) => {
    var receiverAddress = req.body.receiverAddress
    var note = req.body.note||""
    var id = req.body.id
    
    var sql = "UPDATE `tblEnterData` SET `endReceiverAddress` = ?, `endNote` = ?  WHERE `endAutoID`  = ?"
    var dataSql = [receiverAddress,note,id]
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
                            message: 'err_update_zone',
                        });
                    }
                }
            });
        }
    });
    
});

router.post('/delete', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id || ""
    if(!id){
        res.status(400).json({
            message: 'invalid_buyer',
        });
    }else{
        var sql = "DELETE FROM `tblEnterData` WHERE `endAutoID` = ?";
        var dataSql = [id]
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
                                message: 'err_delete',
                            });
                        }
                    }
                });
            }
        });
    }
});

// router.get('/view/filter/invoice', (req, res, next) => {

//     var seller = req.body.seller
//     var type = req.body.type
//     var filterBy = req.body.filterBy
//     var date = req.body.date
//     var statusSql = req.body.statusSql

//     if(filterBy === "seller"){
//         if(type === "seller"){
//             statusSql = " WHERE end_selAutoID = " + seller + " "
//         }else{
//             statusSql = " WHERE `endSenderPhone` = " + seller + " "
//         }
//     }else{
//         statusSql = " WHERE invDateTime = " + date + " "
//     }
   
//     var sql = "SELECT `endAutoID` AS id, end_selAutoID AS seller_id, `endDatetime` as dateTime, endDateTimeOut as dateTimeOut, `endStoreName` as storeName, "+
//     "`endSenderPhone` as senderPhone, "+
//     "`endReceiverPhone` as receiverPhone, `endLocation` as location, end_invAutoID as invoiceID, `endReceiverAddress` "+
//     "as receiverAddress, `endProductType` as productType, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, "+
//     "`endProductPriceKH` as productPriceKH, `endProductPriceEN` as productPriceEN, `endCarType` as carType, `endZone` as zone, `endNoteDelivery` as noteDelivery, "+
//     "`endMoneyGetCustomerKH` as moneyGetCustomerKH, `endMoneyGetCustomerEN` as moneyGetCustomerEN, "+
//     "`endMoneyGotCustomerKH` as moneyGotCustomerKH, `endMoneyGotCustomerEN` as moneyGotCustomerEN, "+
//     "`endSenderFeeEN` as senderFeeEN, `endSenderFeeKH` as senderFeeKH, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, "+
//     "`endDriverFeeEN` as driverFeeEN, `endDriverFeeKH` as driverFeeKH , endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, `endNote` as note, `endStatusProductPrice` as productPriceStatus, end_driAutoID as driverID, endReceiveStatus as receiveStatus, endSenderFeeStatus as senderFeeStatus, endClearStatus as clearStatus, endDoneStatus as doneStatus, invDateTime as invoiceDateTime "+
//     "FROM `tblEnterData` JOIN `tblInvoice` ON end_invAutoID = invAutoID "+statusSql+" ORDER BY endAutoID DESC ";
//     pool.getConnection(function(err, connection) {
//         if(err){
//             res.status(400).json({
//                 err: err,
//             });
//         }else{
//             connection.query(sql, function (error, results, fields) {
//                 connection.release();
//                 if(error){
//                     res.status(400).json({
//                         error: error,
//                     });
//                 }else{
//                     if(results.length > 0){
//                         res.status(200).json({
//                             message: 'success',
//                             data:results,
//                         });
//                     }else{
//                         res.status(200).json({
//                             message: 'success',
//                             data:[],
//                         });
//                     }
//                 }
//             });
//         }
//     });
// });

function filter_data(req,data,callback){
    var data_ = JSON.parse(data)

    var sellerFilter = data_.sellerFilter
    var typeFilter = data_.typeFilter
    var filterBy = data_.filterBy
    var dateStart = data_.dateStart
    var dateEnd = data_.dateEnd
    var statusSql = ''

    if(filterBy === "seller"){
        if(typeFilter === "seller"){
            statusSql += " WHERE end_selAutoID = " + sellerFilter + " "
        }else{
            statusSql += " WHERE `endSenderPhone` = " + sellerFilter + " "
        }
    }else{
        statusSql += " WHERE invDateTime BETWEEN '" + dateStart + " 00:00:00.000' AND '" + dateEnd + " 23:59:59.999' "
    }
   
    var sql = "SELECT `endAutoID` AS id, end_selAutoID AS seller_id, `endDatetime` as dateTime, endDateTimeOut as dateTimeOut, `endStoreName` as storeName, "+
    "`endSenderPhone` as senderPhone, "+
    "`endReceiverPhone` as receiverPhone, `endLocation` as location, end_invAutoID as invoiceID, `endReceiverAddress` "+
    "as receiverAddress, `endProductType` as productType, endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, "+
    "`endProductPriceKH` as productPriceKH, `endProductPriceEN` as productPriceEN, `endCarType` as carType, `endZone` as zone, `endNoteDelivery` as noteDelivery, "+
    "`endMoneyGetCustomerKH` as moneyGetCustomerKH, `endMoneyGetCustomerEN` as moneyGetCustomerEN, "+
    "`endMoneyGotCustomerKH` as moneyGotCustomerKH, `endMoneyGotCustomerEN` as moneyGotCustomerEN, "+
    "`endSenderFeeEN` as senderFeeEN, `endSenderFeeKH` as senderFeeKH, endSenderFeeStatus AS senderFeeStatus, endSenderStatus AS senderStatus, "+
    "`endDriverFeeEN` as driverFeeEN, `endDriverFeeKH` as driverFeeKH , endDriverFeeStatus AS driverFeeStatus, endDriverStatus AS driverStatus, `endNote` as note, `endStatusProductPrice` as productPriceStatus, end_driAutoID as driverID, endReceiveStatus as receiveStatus, endSenderFeeStatus as senderFeeStatus, endClearStatus as clearStatus, endDoneStatus as doneStatus, invDateTime as invoiceDateTime "+
    "FROM `tblEnterData` JOIN `tblInvoice` ON end_invAutoID = invAutoID "+statusSql+" ORDER BY endAutoID DESC ";
    pool.getConnection(function(err, connection) {
        if(err){
            return callback({
                status:400,
                message:err
            })
            
        }else{
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if(error){
                    return callback({
                        status:400,
                        message:error
                    })
                }else{
                    if(results.length > 0){
                        return callback({
                            status:200,
                            message: 'success',
                            data:results,
                            sql:statusSql
                        })
                    }else{
                        return callback({
                            status:200,
                            message: 'no_data',
                            data:[],
                            sql:statusSql
                        })
                    }
                }
            });
        }
    });
}

module.exports = router;