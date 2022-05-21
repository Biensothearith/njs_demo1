const express = require('express');
const router = express.Router();

router.get('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sql = "SELECT `buyAutoID` AS id, `buyName` AS name, `buyPhone` AS phone, `buyPassword` AS password, `buyAddress` AS address, `buyStatus` AS status FROM `tblBuyer` "+
    (userData.usaType != 1 ? "WHERE buy_braAutoID = "+userData.braAutoID:"");
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

router.post('/insert', (req, res, next) => {
    var userData = req.userDataFromToken;
    var name = req.body.name || '';
    var phone = req.body.phone || '';
    var password = req.body.password || '';
    var address = req.body.address || '';
    var status = req.body.status;
    var sql = "INSERT INTO `tblBuyer`(`buyName`, `buyPhone`, `buyPassword`, `buyAddress`, `buyStatus`, buy_braAutoID) VALUES (?, ?, ?, ?, ?, ?)";
    var dataSql = [name, phone, password, address, status, userData.braAutoID]
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
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'err_insert',
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
    var name = req.body.name || '';
    var phone = req.body.phone || '';
    var password = req.body.password || '';
    var address = req.body.address || '';
    var status = req.body.status;
    if(password){
        var sql = "UPDATE `tblBuyer` SET `buyName`= ?,`buyPhone`= ?,`buyPassword`= ?,`buyAddress`=  ?,`buyStatus`= ? WHERE `buyAutoID` = ?";
        var dataSql = [name, phone, password, address, status, id]
    }else{
        var sql = "UPDATE `tblBuyer` SET `buyName`= ?,`buyPhone`= ?,`buyAddress`=  ?,`buyStatus`= ? WHERE `buyAutoID` = ?";
        var dataSql = [name, phone, address, status, id]
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
                            message: 'err_update',
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
        var sql = "DELETE FROM `tblBuyer` WHERE `buyAutoID` = ?";
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

module.exports = router;