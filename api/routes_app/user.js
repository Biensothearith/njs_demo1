const express = require('express');
const router = express.Router();
var fs = require('fs');
var base64Img = require('base64-img');

router.post('/profile', (req, res, next) => {
    var userData = req.userDataFromToken;
    let oldImageName = req.body.oldImageName || '';
    let newImageData = req.body.newImageData || '';
    var memAutoID = userData.ID;
    var pictureName = memAutoID+'_'+makeName();
    var typeAccount = userData.typeAccount;
    if(typeAccount === "driver"){
        base64Img.img(newImageData, file_upload_path+'driver/', pictureName, function(err, filepath) {
            if (err){
                profile.status = 0;
                res.status(400).json({
                    message: err,
                });
            }
            if(filepath){
                var sqlData = [pictureName+'.png', memAutoID];
                var sql = "UPDATE `tblDriver` SET `driImage` = ? WHERE `driAutoID` = ?";
                pool.getConnection(function(err, connection) {
                    if(err){
                        res.status(400).json({
                            message: err,
                        });
                    }else{
                        connection.query(sql, sqlData, function (error, results, fields) {
                            connection.release();
                            if(error){
                                res.status(400).json({
                                    message: error.code,
                                });
                            }
                            if(results){
                                if(oldImageName){
                                    fs.unlink(file_upload_path+'/driver/'+oldImageName, function(err, ressults){
                                        // if no error, file has been deleted successfully
                                        if(err){
                                            console.log('err', err);
                                        }
                                    });
                                    res.status(200).json({
                                        message: 'success',
                                        data: pictureName+'.png',
                                    });
                                }else{
                                    res.status(200).json({
                                        message: 'success',
                                        data: pictureName+'.png',
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }else{
        base64Img.img(newImageData, file_upload_path+'seller/', pictureName, function(err, filepath) {
            if (err){
                profile.status = 0;
                res.status(400).json({
                    message: err,
                });
            }
            if(filepath){
                var sqlData = [pictureName+'.png', memAutoID];
                var sql = "UPDATE `tblSeller` SET `selImage`=? WHERE `selAutoID` = ?";
                pool.getConnection(function(err, connection) {
                    if(err){
                        res.status(400).json({
                            message: err,
                        });
                    }else{
                        connection.query(sql, sqlData, function (error, results, fields) {
                            connection.release();
                            if(error){
                                res.status(400).json({
                                    message: error.code,
                                });
                            }
                            if(results){
                                if(oldImageName){
                                    fs.unlink(file_upload_path+'/seller/'+oldImageName, function(err, ressults){
                                        // if no error, file has been deleted successfully
                                        if(err){
                                            console.log('err', err);
                                        }
                                    });
                                    res.status(200).json({
                                        message: 'success',
                                        data: pictureName+'.png',
                                    });
                                }else{
                                    res.status(200).json({
                                        message: 'success',
                                        data: pictureName+'.png',
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post('/information', (req, res, next) => {
    var userData = req.userDataFromToken;
    let name = req.body.name || '';
    let bankName = req.body.bankName || '';
    let bankAccountNumber = req.body.bankAccountNumber || '';
    let bankAccountName = req.body.bankAccountName || '';
    var selAutoID = userData.ID;
    var sql = `
        UPDATE tblSeller SET 
        selName=?, selBankName=?,selBankAccountNumber=?,selBankAccountName=? 
        WHERE selAutoID = ?
    `;
    var sqlData = [name, bankName, bankAccountNumber, bankAccountName, selAutoID];
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                message: err,
            });
        }else{
            connection.query(sql, sqlData, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(400).json({
                        message: error.code,
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

router.post('/phone', verifyTokenSMS, (req, res, next) => {
    var userData = req.userDataFromToken;
    let phone = req.body.phone || '';
    var selAutoID = userData.ID;
    checkPhoneDuplicate(phone, function (results) {
        if(results.code == 200){
            var sql = `
                UPDATE tblSeller SET 
                selPhone = ?
                WHERE selAutoID = ?
            `;
            var sqlData = [phone, selAutoID];
            pool.getConnection(function(err, connection) {
                if(err){
                    res.status(400).json({
                        emessagerr: err,
                    });
                }else{
                    connection.query(sql, sqlData, function (error, results, fields) {
                        connection.release();
                        if(error){
                            res.status(400).json({
                                message: error.code,
                            });
                        }else{
                            if(results.affectedRows){
                                res.status(200).json({
                                    message: 'success',
                                });
                            }else{
                                res.status(400).json({
                                    message: 'error_update',
                                    results
                                });
                            }
                        }
                    });
                }
            });
        }else{
            res.status(results.code).json({
                ...results
            });
        }
    })
});

router.post('/change-password', (req, res, next) => {
    var userData = req.userDataFromToken;
    let id = userData.ID;
    let password = req.body.password;
    let typeAccount = userData.typeAccount;
    var sqlData = [password, id];
    var sql="";
    if(typeAccount === "driver"){
      sql = "UPDATE `tblDriver` SET `driPassword`= ? WHERE driAutoID = ?";
    }else{
      sql = "UPDATE `tblSeller` SET `selPassword`= ? WHERE selAutoID = ?";
    }
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                message: err,
            });
        }else{
            connection.query(sql, sqlData, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(400).json({
                        message: error,
                    });
                }else{
                    if(results && results.affectedRows > 0){
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'invalid_user',
                        });
                    }
                }
            });
        }
    });
});

router.post('/validate-password', (req, res, next) => {
    var response = {};
    var userData = req.userDataFromToken;
    let password = req.body.password;
    let typeAccount = userData.typeAccount;
    let memAutoID = userData.ID;
    var sqlData = [memAutoID, password];
    var sql="";
    if(typeAccount==="driver"){
        sql = "SELECT driPassword FROM `tblDriver` WHERE driAutoID = ? AND `driPassword`= ?";
    }else{
        sql = "SELECT selPassword  FROM `tblSeller` WHERE selAutoID  = ? AND `selPassword`= ?";
    }
    
    pool.getConnection( function(err, connection) {
        if(err){
            response = {
                message:err
            };
            res.status(400).json(response);
        }else{
            connection.query(sql, sqlData,  function (error, results, fields) {
                connection.release();
                if(error){
                    response = {
                        message:error
                    };
                    res.status(400).json(response);
                }else{
                    if(results && results.length > 0){
                        response = {
                            message: 'success'
                        }
                        res.status(200).json(response);
                    }else{
                        response = {
                            message:'invalid_password'
                        }
                        res.status(400).json(response);
                    }
                }
            });
        }
    });
})

router.post('/logout', (req, res, next) => {
    var userData = req.userDataFromToken;
    let memAutoID = userData.ID;
    var sqlData = [memAutoID];
    var sql = "";
    var response = {};
    let typeAccount = userData.typeAccount;
    if(typeAccount === "driver"){
        sql = "UPDATE `tblDriver` SET driPushyToken = NULL WHERE driAutoID = ?";
    }else{
        sql = "UPDATE `tblSeller` SET selPushyToken = NULL WHERE selAutoID  = ?";
    }
    
    pool.getConnection( function(err, connection) {
        if(err){
            response = {
                message:err
            };
            res.status(400).json(response);
        }else{
            connection.query(sql, sqlData,  function (error, results, fields) {
                connection.release();
                if(error){
                    response = {
                        message:error
                    };
                    res.status(400).json(response);
                }else{
                    if(results && results.affectedRows){
                        response = {
                            message: 'success'
                        }
                        res.status(200).json(response);
                    }else{
                        response = {
                            message:'something_wrong'
                        }
                        res.status(400).json(response);
                    }
                }
            });
        }
    });
})

function makeName(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports = router;