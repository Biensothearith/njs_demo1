const express = require('express');
const router = express.Router();

router.get('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sql = "SELECT `zonAutoID` AS id, `zonName` AS name,`zonPrefix` as prefix, `zonStatus` AS status FROM `tblZone` "
    // +
    // (userData.usaType != 1 ? "WHERE zon_braAutoID = "+userData.braAutoID:"");
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
    var status = req.body.status || false;
    var prefix=req.body.prefix?req.body.prefix.toLocaleUpperCase():""
    var sql = "INSERT INTO `tblZone`(`zonName`, `zonStatus`, zon_braAutoID,zonPrefix) VALUES (?, ?, ?,?)";
    var dataSql = [name, status, userData.braAutoID,prefix]
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    if(error['errno']===1062){
                        res.status(400).json({
                            error: error,
                            message:'duplicate'
                        });
                    }else{
                        res.status(400).json({
                            error: error,
                        });
                    }
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
    var status = req.body.status || false;
    var prefix=req.body.prefix?req.body.prefix.toLocaleUpperCase():"";
    var sql = "UPDATE `tblZone` SET `zonName`= ?, `zonStatus`= ?,`zonPrefix`=? WHERE `zonAutoID` = ?";
    var dataSql = [name, status,prefix, id]
    
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    if(error['errno']===1062){
                        res.status(400).json({
                            error: error,
                            message:'duplicate'
                        });
                    }else{
                        res.status(400).json({
                            error: error,
                        });
                    }
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
            message: 'invalid_zone',
        });
    }else{
        var sql = "DELETE FROM `tblZone` WHERE `zonAutoID` = ?";
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