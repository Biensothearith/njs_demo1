const express = require('express');
const router = express.Router();
var fs = require('fs');
var base64Img = require('base64-img');

router.post('/seller', (req, res, next) => {
    var userData = req.userDataFromToken;
    var selAutoID = userData.ID
    var braID = userData.braID
    var amount = req.body.amount
    var requestType = req.body.requestType
    var location = JSON.stringify(req.body.location)
    getRandomDriver(braID, requestType, function (results) {
        if(results && results.code == 200){
            var driAutoID = results.driAutoID
            var sql = `
                INSERT INTO tblRequireBooking(
                    rbo_selAutoID, rbo_driAutoID, rboAmount, rboLocation, rboDriverType
                ) VALUES (?, ?, ?, ?, ?)
            `;
            var dataSql = [selAutoID, driAutoID, amount, location, requestType]
            pool.getConnection(function(err, connection) {
                if(err){
                    res.status(400).json({
                        err: err,
                    });
                }else{
                    connection.beginTransaction(function(err) {
                        if (err) {
                            connection.release()
                            res.status(400).json({
                                message: err,
                            });
                        }else{
                            connection.query(sql, dataSql, function (error, results, fields) {
                                if(error){
                                    connection.rollback(function() {
                                        connection.release()
                                        res.status(400).json({
                                            message: error,
                                        });
                                    });
                                }else{
                                    if(results.insertId){
                                        if(driAutoID !== null){
                                            var sql = `
                                                UPDATE tblDriver SET driLastShipDateTime = NOW(), driBusy = 1 WHERE driAutoID = ?
                                            `;
                                            var dataSql = [driAutoID]
                                            connection.query(sql,dataSql, function (error, results, fields) {
                                                if(error){
                                                    connection.rollback(function() {
                                                        connection.release()
                                                        res.status(400).json({
                                                            message: error,
                                                        });
                                                    });
                                                }else{
                                                    if(results.affectedRows){
                                                        connection.commit(function(err) {
                                                            if (err) {
                                                                connection.rollback(function() {
                                                                    connection.release()
                                                                    res.status(400).json({
                                                                        code:400,
                                                                        message:'error_commit'
                                                                    });
                                                                });
                                                            }else{
                                                                connection.release()
                                                                sendNotification('driver', driAutoID, {
                                                                    title: 'You have new request booking',
                                                                    message:`${userData.name} request ship ${parseInt(amount) > 1 ? amount+' packages': amount+' package'}`,
                                                                    typeMessange:'warning',
                                                                    data: {
                                                                        nav:'BOOKING'
                                                                    }
                                                                });
                                                                res.status(200).json({
                                                                    message: 'success',
                                                                });
                                                            }
                                                        });
                                                    }else{
                                                        connection.rollback(function() {
                                                            connection.release()
                                                            res.status(400).json({
                                                                message: 'update_driver_busy_error',
                                                            });
                                                        });
                                                    }
                                                }
                                            });
                                        }else{
                                            connection.commit(function(err) {
                                                if (err) {
                                                    connection.rollback(function() {
                                                        connection.release()
                                                        res.status(400).json({
                                                            code:400,
                                                            message:'error_commit'
                                                        });
                                                    });
                                                }else{
                                                    connection.release()
                                                    res.status(200).json({
                                                        message: 'success',
                                                    });
                                                }
                                            });
                                        }
                                    }else{
                                        connection.rollback(function() {
                                            connection.release()
                                            res.status(400).json({
                                                message: 'insert_error',
                                            });
                                        });
                                    }
                                }
                            });
                        }
                    })
                }
            });
        }else{
            res.status(results.code).json(results)
        }
    })
});

router.get('/driver/list', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sql = `
        SELECT rboAutoID as id, rbo_selAutoID as sellerID, rboAmount as amount, 
        rboLocation as location, selName, selPhone as phone
        FROM tblRequireBooking 
        JOIN tblSeller ON selAutoID = rbo_selAutoID
        WHERE rboStatus = 0 AND rbo_driAutoID = ? ORDER BY rboDatetime DESC
    `;
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

router.post('/driver/done', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id;
    var sql = `
        UPDATE tblRequireBooking SET rboStatus = 1
        WHERE rboAutoID = ?
    `;
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
                    if(results.affectedRows){
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

module.exports = router;