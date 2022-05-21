const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sqlStatus = ''
    if(userData.usaType === 1){
        sqlStatus = "FROM `tblMenuAdmin` WHERE madStatus = 1 ORDER BY madOrder ASC";
    }else{
        sqlStatus = "FROM `tblMenuAdmin` JOIN `tblPermissionAdmin` ON  `pma_madAutoID` = madAutoID "+
        "WHERE madStatus = 1 AND `pmaView` = 1 AND pma_usaAutoID = "+userData.usaAutoID+" "+
        "ORDER BY madOrder ASC";
    }
    var sql = "SELECT madAutoID AS id, `madName` AS text, `madPageName` AS page, `madIcon` AS icon, "+
    "`madOrder` AS orderBy, madStatus AS status "+sqlStatus
    
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
                            userData
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

router.get('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sql = "SELECT madAutoID AS id, `madName` AS text, `madPageName` AS page, `madIcon` AS icon, "+
    "`madOrder` AS orderBy, madStatus AS status FROM `tblMenuAdmin` "+
    "ORDER BY madOrder ASC";
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
    var text = req.body.text || '';
    var page = req.body.page || '';
    var icon = req.body.icon || '';
    var orderBy = req.body.orderBy || '';
    var status = req.body.status;
    var sql = "INSERT INTO `tblMenuAdmin`(`madName`, `madPageName`, `madIcon`, `madOrder`, `madStatus`) VALUES (?, ?, ?, ?, ?)";
    var dataSql = [text, page, icon, orderBy, status]
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
    var text = req.body.text || '';
    var page = req.body.page || '';
    var icon = req.body.icon || '';
    var orderBy = req.body.orderBy || '';
    var status = req.body.status;
    var sql = "UPDATE `tblMenuAdmin` SET `madName`= ?,`madPageName`= ?,`madIcon`= ?,`madOrder`= ?,`madStatus`= ? WHERE `madAutoID` = ?";
    var dataSql = [text, page, icon, orderBy, status, id]
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
            message: 'invalid_menu',
        });
    }else{
        var sql = "DELETE FROM `tblMenuAdmin` WHERE `madAutoID` = ?";
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
