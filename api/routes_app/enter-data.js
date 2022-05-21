const express = require('express');
const router = express.Router();
const moment = require("moment")

router.post('/input/', (req, res, next) => {
    var userData = req.userDataFromToken;
    console.log(userData)
    var userData = req.userDataFromToken,
    parentId = userData.parentId || null,
    percentParentInput =userData.parentId?5.00:0.00,
    endManyPackage=userData.manyPackage || 1;

    storeName = req.body.storeName || '',
    senderPhone = req.body.senderPhone || '',
    receiverAddress = req.body.receiverAddress || '',
    zone = req.body.zone || '',
    receiverPhone = req.body.receiverPhone || '',

    note = req.body.note || '',
    productType = req.body.productType || '',
    productPriceKH = req.body.productPriceKH || 0,
    productPriceEN = req.body.productPriceEN || 0,

    productPriceStatus = req.body.productPriceStatus || 0,
    driverFeeKH = req.body.driverFeeKH || 0,
    driverFeeEN = req.body.driverFeeEN || 0,
    driverFeeStatus = req.body.driverFeeStatus || 0,

    driverStatus = req.body.driverStatus || 0,
    type = req.body.type || 0,
    seller_id = req.body.seller_id,
    seller_id = seller_id ? seller_id:null;
    
    var endMoneyGetCustomerKH = 0;
    endMoneyGetCustomerKH += parseFloat(productPriceKH) > 0 ? parseFloat(productPriceKH):0;
    endMoneyGetCustomerKH += parseFloat(driverFeeKH) > 0 ? parseFloat(driverFeeKH):0;

    var endMoneyGetCustomerEN = 0;
    endMoneyGetCustomerEN += parseFloat(productPriceEN) > 0 ? parseFloat(productPriceEN):0;
    endMoneyGetCustomerEN += parseFloat(driverFeeEN) > 0 ? parseFloat(driverFeeEN):0;
    var sql = `INSERT INTO tblEnterData(
            endStoreName, endSenderPhone, endReceiverAddress, endZone, endReceiverPhone, 
            endNote, endProductType, endProductPriceKH, endProductPriceEN, endStatusProductPrice, 
            endDriverFeeEN, endDriverFeeKH, endDriverFeeStatus, endDriverStatus, endLocation, 
            end_selAutoID, end_braAutoID, endBraIdInput, end_driAutoID, endMoneyGetCustomerKH,
            endMoneyGetCustomerEN,endBranchIdParentInput,endParentPercentInput,endManyPackage
        ) VALUES (
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, 
            ?, ?, ?, ?
        )`;
    var dataSql = [
        storeName, senderPhone, receiverAddress, zone, receiverPhone,
        note, productType, productPriceKH, productPriceEN, productPriceStatus, 
        driverFeeEN, driverFeeKH, driverFeeStatus, driverStatus, type, 
        seller_id, userData.braID, userData.braID, userData.ID, endMoneyGetCustomerKH,
        endMoneyGetCustomerEN,parentIdIput,percentParentInput,endManyPackage
    ]
    console.log(dataSql)
    pool.getConnection(function(err, connection) {
        if(userData.braID){
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
});

router.get('/store', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sql= `
        SELECT selAutoID as id, selName as name, selEmail as email, selPhone as phone, 
        selImage as image, selAddress as address, selProductType as productType, 
        selBankName as bankName, selBankAccountNumber as bankAccountNumber, 
        selBankAccountName as bankAccountName FROM tblSeller 
        WHERE selStatus = 1 AND sel_braAutoID = ?
    `
    var dataSql = [userData.braID]
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
                    if(results.length > 0){
                        res.status(200).json({
                            message: 'success',
                            data:results
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
});

router.post('/receive', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id;
    var sellerID = req.body.sellerID;
    var moneyGotCustomerEN = req.body.moneyGotCustomerEN || 0;
    var moneyGotCustomerKH = req.body.moneyGotCustomerKH || 0;
    var dateTimeOut = new Date

    var sql= `
        UPDATE tblEnterData SET 
        endPercentageOutput = (SELECT braPercentage FROM tblBranch WHERE braAutoID = ?),
        endBraIdOutput = ?,
        endDateTimeOut = ?,
        endMoneyGotCustomerEN = ?, endMoneyGotCustomerKH = ?,
        endReceiveStatus = 1
        WHERE endAutoID = ?
    `
    var dataSql = [ userData['braID'], userData['braID'], dateTimeOut, moneyGotCustomerEN, moneyGotCustomerKH, id]
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
                    if(results.affectedRows){
                        checkFreeDriver(userData.ID)
                        sendNotification('seller', sellerID, {
                            title: 'Your customer received package',
                            message:`${userData.name} completely delivery package number #${id}`,
                            typeMessange:'success',
                            data: {
                                nav:'FLOW',
                                data: id
                            }
                        });
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'error_update',
                        });
                    }
                }
                
            });
        }
    });
});

router.post('/return', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id;
    var sellerID = req.body.sellerID;
    var note = req.body.note || '';
    var sql= `
        UPDATE tblEnterData SET endReturned = 1, endReturnedDate = NOW(), endReturnedNote = ?
        WHERE endAutoID = ?
    `
    var dataSql = [note, id]
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
                    if(results.affectedRows){
                        checkFreeDriver(userData.ID)
                        sendNotification('seller', sellerID, {
                            title: 'Your package has been return',
                            message:`Package number #${id} returned`,
                            typeMessange:'success',
                            data: {
                                nav:'FLOW',
                                data: id
                            }
                        });
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'error_update',
                        });
                    }
                }
                
            });
        }
    });
});

router.post('/delay', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id;
    var sellerID = req.body.sellerID;
    var date = req.body.date || null;
    var note = "ឥវ៉ាន់ពន្យាពេល(យកថ្ងៃទី"+moment(date).format('DD-MM-YYYY')+")"
    var sql= `
        UPDATE tblEnterData SET 
        endDelayDate = ?, 
        endNote = ?,
        end_driAutoID = ?,
        WHERE endAutoID = ?
    `
    var dataSql = [date, note, null, id]
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
                    if(results.affectedRows){
                        checkFreeDriver(userData.ID)
                        sendNotification('seller', sellerID, {
                            title: 'Your package has been delay',
                            message:`${userData.name} has been delay your package number #${id}`,
                            typeMessange:'success',
                            data: {
                                nav:'FLOW',
                                data: id
                            }
                        });
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'error_update',
                        });
                    }
                }
                
            });
        }
    });
});

router.get('/delay/:page', (req, res, next) => {
    var userData = req.userDataFromToken;
    var page = req.params.page
    var offset = (page - 1) * row_count ;
    var sql= `
        SELECT endAutoID AS id, end_selAutoID AS sellerID, selAddress as sellerAddress, 
        IF(endReturned = 1,
            3,
            IF(endDoneStatus = 1,
                  2,
                  IF(endDelayDate IS NOT NULL,
                        4,
                        IF(end_driAutoID IS NOT NULL,
                              1,
                              0  
                        )
                  )
            )
        ) as status,
        end_driAutoID AS driverID, endDriverFeeKH as driverFeeKH, endDriverFeeEN as driverFeeEN,
        endDatetime AS dateTime, endDateTimeOut AS dateTimeOut, endStoreName AS storeName,
        endSenderPhone AS senderPhone, endReceiverPhone AS receiverPhone, endLocation AS location,
        endZone AS zone, endReceiverAddress AS receiverAddress,  endMoneyGetCustomerKH AS totalGetKH,endMoneyGetCustomerEN AS totalGetEN,
        endProductType AS productType,driName AS driverName, driPhone AS driverPhone ,
        endNote AS note, endDelayDate as delayDate, endProductPriceEN as productEN 
        FROM tblEnterData 
        JOIN tblDriver ON end_driAutoID = driAutoID
        JOIN tblSeller ON end_selAutoID = selAutoID
        WHERE endDelayDate IS NOT NULL AND end_driAutoID = ?
        ORDER BY endDelayDate DESC LIMIT ${offset}, ${row_count}
    `
    var dataSql = [userData.ID]
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
                    if(results.length > 0){
                        res.status(200).json({
                            message: 'success',
                            data:results
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
});

module.exports = router;