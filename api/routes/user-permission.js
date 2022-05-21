const express = require('express');
const router = express.Router();
const sort = require('fast-sort');

router.get('/view/:id', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.params.id;    
    var sql = "SELECT madAutoID AS men_ID, madName AS men_name FROM `tblMenuAdmin`";
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
                        var i = 0;
                        var length = results.length;
                        var dataRes = [];
                        results.forEach(value => {
                            var sql_ = "SELECT `pmaAutoID` AS per_ID, `pma_usaAutoID` AS per_userID, `pma_madAutoID` AS per_munuID, `pmaView` AS per_view, `pmaInsert` AS per_insert, `pmaDelete` AS per_delete, `pmaUpdate` AS per_update  "+
                            "FROM `tblPermissionAdmin` WHERE pma_madAutoID = ? AND `pma_usaAutoID` = ?"
                            var dataSql = [value.men_ID ,id]
                            pool.getConnection(function(err, connection) {
                                if(err){
                                    res.status(400).json({
                                        err: err,
                                    });
                                }else{
                                    connection.query(sql_, dataSql, function (error_, results_, fields_) {
                                        connection.release();
                                        if(error_){
                                            res.status(400).json({
                                                error: error_,
                                            });
                                        }else{
                                            if(results_.length > 0){
                                                var dataItem = {
                                                    ...value,
                                                    ...results_[0],
                                                }
                                            }else{
                                                var dataItem = {
                                                    ...value,
                                                    per_userID: null,
                                                    per_ID: null,
                                                    per_munuID: null,
                                                    per_view: null,
                                                    per_insert: null,
                                                    per_update: null,
                                                    per_delete: null,
                                                } 
                                            }
                                            dataRes.push(dataItem)
                                            if(i == length - 1){
                                                res.status(200).json({
                                                    message: 'success',
                                                    data:sort(dataRes).asc('men_ID')
                                                });
                                            }
                                            i++;
                                        }
                                    });
                                }
                            });
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

router.post('/update', (req, res, next) => {
    var userData = req.userDataFromToken;
    var main_id = req.body.main_id;
    var men_ID = req.body.men_ID;
    var men_name = req.body.men_name;
    var per_ID = req.body.per_ID;
    var per_delete = req.body.per_delete;
    var per_insert = req.body.per_insert;
    var per_munuID = req.body.per_munuID;
    var per_update = req.body.per_update;
    var per_userID = req.body.per_userID;
    var per_view = req.body.per_view ;
    if(per_ID != '' && per_ID == null){
        // insert
        var dataSql = [main_id, men_ID, per_view, per_insert, per_delete, per_update];
        var sql = "INSERT INTO `tblPermissionAdmin`(`pma_usaAutoID`, `pma_madAutoID`, `pmaView`, `pmaInsert`, `pmaDelete`, `pmaUpdate`) VALUES (?, ?, ?, ?, ?, ?)";
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
                                message: 'wrong_data',
                            });
                        }
                    }
                });
            }
        });
    }else if(per_ID != '' && per_ID != null){
        // update
        var dataSql = [per_view, per_insert, per_delete, per_update, per_ID];
        var sql = "UPDATE `tblPermissionAdmin` SET `pmaView`= ?,`pmaInsert`= ?,`pmaDelete`= ?,`pmaUpdate`= ? WHERE `pmaAutoID` = ?";
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
                                message: 'wrong_data',
                            });
                        }
                    }
                });
            }
        });
    }else{
        res.status(400).json({
            message: 'wrong_data_all',
        });
    }
});

module.exports = router;