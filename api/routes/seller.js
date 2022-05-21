const express = require('express');
const router = express.Router();

router.get('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sql = "SELECT `selAutoID` AS id, `selName` AS name, `selPhone` AS phone, `selEmail` AS email, `selPassword`, "+
    "`selPassword` AS password, `selAddress` AS address, `selStatus` AS status, "+
    "`selProductType` AS productType, `selBankName` AS bankName, "+
    "`selBankAccountNumber` AS bankAccountNumber, selBankAccountName AS bankAccountName "+
    "FROM `tblSeller` "+(userData.usaType != 1 ? "WHERE sel_braAutoID = "+userData.braAutoID:"");
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
    var email = req.body.email || '';
    var password = req.body.password || '';
    var address = req.body.address || '';
    var productType = req.body.productType || null;
    var bankName = req.body.bankName || null;
    var bankAccountName = req.body.bankAccountName || null;
    var bankAccountNumber = req.body.bankAccountNumber || null;
    var status = req.body.status || '';
    var sql = "INSERT INTO `tblSeller`(`selName`, `selPhone`, `selEmail`, `selPassword`, `selAddress`, "+
    "`selStatus`, sel_braAutoID, selProductType, selBankName, selBankAccountNumber, selBankAccountName) "+
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var dataSql = [name, phone, email, password, address, status, userData.braAutoID, productType, bankName, bankAccountNumber, bankAccountName]
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
    var email = req.body.email || '';
    var password = req.body.password || '';
    var address = req.body.address || '';
    var productType = req.body.productType || null;
    var bankName = req.body.bankName || null;
    var bankAccountName = req.body.bankAccountName || null;
    var bankAccountNumber = req.body.bankAccountNumber || null;
    var status = req.body.status || '';
    if(password){
        var sql = "UPDATE `tblSeller` SET `selName`= ?,`selPhone`= ?, `selEmail` = ?, `selPassword`= ?,`selAddress`= ?,`selStatus`= ?, `selProductType`=?,`selBankName`=?,`selBankAccountNumber`=?,`selBankAccountName`=? WHERE `selAutoID` = ?";
        var dataSql = [name, phone, email, password, address, status, productType, bankName, bankAccountNumber, bankAccountName, id]
    }else{
        var sql = "UPDATE `tblSeller` SET `selName`= ?,`selPhone`= ?, `selEmail` = ?, `selAddress`= ?,`selStatus`= ?, `selProductType`=?,`selBankName`=?,`selBankAccountNumber`=?,`selBankAccountName`=? WHERE `selAutoID` = ?";
        var dataSql = [name, phone, email, address, status, productType, bankName, bankAccountNumber, bankAccountName, id]
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
        var sql = "DELETE FROM `tblSeller` WHERE `selAutoID` = ?";
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